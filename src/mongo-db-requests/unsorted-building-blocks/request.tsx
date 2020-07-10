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
    getPositionMatrices,
    addPositionMatrices,
    addValues,
    getValues,
} from '../utilities';



interface Options
{
    url: string;
    database: string;
    moleculeKey: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
    ignoredCollections: string[];
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
        getMoleculeEntries(options, database)
        .then(getPartialMolecules(options)),
    ]) )

    .then( ([database, valueCollections, molecules]) =>
    {

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(
                options.moleculeKey,
                Array.from(molecules.keys()),
            );

        return Promise.all([

            Promise.resolve(getPageKind({
                numItems: molecules.size,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage,
            })),

            Promise.resolve(valueCollections),

            getPositionMatrices(
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, molecules)
            ),

            Promise.all(
                valueCollections
                .map(getValues(database, query))
                .map(promise => promise.then(
                    addValues(options.moleculeKey, molecules)
                ))
            ),

        ]);
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
