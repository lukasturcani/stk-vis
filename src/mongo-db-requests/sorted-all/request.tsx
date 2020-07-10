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
} from '../utilities';
import {
    IMolecule,
    PageKind,
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
        ]);

    return MongoClient
    .connect(options.url)
    .catch(err => { throw new DatabaseConnectionError() })

    .then(
        (client: MongoClient) => client.db(options.database)
    )

    .then( (database: Db) => Promise.all([
        Promise.resolve(database),
        getSortedValues(options, database)
    ]) )

    .then( ([database, valueEntries]) =>
    {

        const moleculeQuery: IMoleculeEntryQuery
            = getMoleculeEntryQuery(options, valueEntries);

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(options.moleculeKey, molecules);

        return Promise.all([

            Promise.resolve(getPageKind({
                numItems: molecules.size,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage,
            })),

            Promise.resolve(valueCollections),

            getPositionMatrixPromise(
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, molecules)
            ),

            getPositionMatrixPromise(
                database,
                query,
                options.buildingBlockPositionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, molecules)
            ),

        ]);
    })

    .then((
        [pageKind, valueCollections, molecules, buildingBlocks]
    )
        : [PageKind, string[], IMolecule[]] =>
    {
        molecules.push(...buildingBlocks);
        return [pageKind, valueCollections, molecules];
    })

    .then((
        [pageKind, valueCollections, molecules]
    )
        : ISuccess =>
    {
        return {
            kind: ResultKind.Success,
            pageKind,
            valueCollections,
            molecules,
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
