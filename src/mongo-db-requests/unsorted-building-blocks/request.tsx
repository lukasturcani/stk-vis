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
    getPositionMatrixEntries,
    addPositionMatrices,
    addValues,
    getValueEntries,
} from '../utilities';
import {
    getMoleculeDataQuery,
    IMoleculeDataQuery,
} from '../types/IMoleculeDataQuery';
import {
    getPageKind,
} from '../types/PageKind';
import {
    IPartialMolecule,
    mapKeysToMolecules,
} from '../types/IPartialMolecule';



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
    .catch(() => { throw new DatabaseConnectionError() })

    .then(
        (client: MongoClient) => client.db(options.database)
    )

    .then( (database: Db) => Promise.all([
        Promise.resolve(database),
        getValueCollections(nonValueCollections, database),
        getMoleculeEntries(options, database),
    ]) )

    .then( ([database, valueCollections, molecules]) =>
    {
        const moleculeMap: Map<string, IPartialMolecule>
            = mapKeysToMolecules(
                molecules.slice(0, options.numEntriesPerPage)
            );

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(
                options.moleculeKey,
                Array.from(moleculeMap.keys()),
            );

        return Promise.all([

            Promise.resolve(getPageKind({
                numItems: molecules.length,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage,
            })),

            Promise.resolve(valueCollections),

            getPositionMatrixEntries(
                options.moleculeKey,
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, moleculeMap)
            ),

            Promise.all(
                valueCollections
                .map(getValueEntries(database, query))
                .map(promise => promise.then(
                    addValues(options.moleculeKey, moleculeMap)
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
