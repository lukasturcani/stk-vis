import {
    MongoClient,
    Db,
} from 'mongodb';
import {
    IResult,
    ResultKind,
    ISuccess,
} from './IResult';
import {
    DatabaseConnectionError,
    CollectionConnectionError,
} from '../errors';
import {
    getMoleculeEntries,
} from './utilities';
import {
    getValueCollections,
    getPartialMolecules,
    getPageKind,
    getMoleculeDataQuery,
    IMoleculeDataQuery,
    getPositionMatrixPromise,
    addPositionMatrices,
    addValues,
    getValuePromise,
    getSortedValues,
    getValueEntries,
} from '../utilities';
import {
    IMolecule,
    PageKind,
    IValueEntries,
    IPositionMatrixEntry,
    IPartialMolecules,
    ISortedEntries,
} from '../types';



interface Options
{
    url: string;
    database: string;
    moleculeKey: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
    ignoredCollections: string[];
    sortedCollection: string;
}


export function request(
    options: Options,
)
    : Promise<IResult>
{
    const nonValueCollections: Set<string>
        = new Set([
            ...options.ignoredCollections,
            options.moleculeCollection,
            options.positionMatrixCollection,
            options.buildingBlockPositionMatrixCollection,
            options.sortedCollection,
        ]);

    return MongoClient
    .connect(options.url)
    .catch(err => { throw new DatabaseConnectionError() })

    .then(
        (client: MongoClient) => client.db(options.database)
    )

    .then( (database: Db) => Promise.all([
        Promise.resolve(database),
        getValueCollections(nonValueCollections, database),
        getSortedValues(options, database)
    ]) )

    .then(([
        database,
        valueCollections,
        sortedValues,
    ]: [Db, string[], ISortedEntries]) =>
    {

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(
                options.moleculeKey,
                sortedValues.items.map(item => item.key),
            );

        return Promise.all([
            Promise.resolve(getPageKind({
                numItems: sortedValues.items.length,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage,
            })),

            Promise.resolve(sortedValues),

            Promise.resolve(valueCollections),

            getMoleculeEntries(options, database, query)
            .then(getPartialMolecules(options)),

            getPositionMatrixPromise(
                database,
                query,
                options.positionMatrixCollection,
            ),

            getPositionMatrixPromise(
                database,
                query,
                options.buildingBlockPositionMatrixCollection,
            ),

            Promise.all(
                valueCollections
                .map(getValuePromise(database, query)),
            ),

        ]);
    })

    .then(([
        pageKind,
        sortedValues,
        valueCollections,
        molecules,
        matrices1,
        matrices2,
        values,
    ]:
    [
        PageKind,
        ISortedEntries,
        string[],
        IPartialMolecules,
        IPositionMatrixEntry[],
        IPositionMatrixEntry[],
        IValueEntries[],
    ])
        : ISuccess =>
    {
        const molecules1: IMolecule[]
            = addPositionMatrices
                (options.moleculeKey, molecules)
                (matrices1);

        const molecules2: IMolecule[]
            = addPositionMatrices
                (options.moleculeKey, molecules)
                (matrices2)

        molecules1.push(...molecules2);

        addValues(options.moleculeKey, molecules)(
            getValueEntries(sortedValues)
        );
        values.map(addValues(options.moleculeKey, molecules));

        valueCollections.push(options.sortedCollection);

        return {
            kind: ResultKind.Success,
            pageKind,
            valueCollections,
            molecules: molecules1,
        };
    })

    .catch(
        (err: Error) =>
        {
            if (err instanceof DatabaseConnectionError)
            {
                return {
                    kind: ResultKind.DatabaseConnectionError,
                };
            }
            if (err instanceof CollectionConnectionError)
            {
                return {
                    kind: ResultKind.CollectionConnectionError,
                }
            }
            else
            {
                return {
                    kind: ResultKind.UncategorizedError,
                };
            }
        }
    );
}
