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
    getValueEntries,
    addValues,
} from '../utilities';
import {
    IMolecule,
} from '../types/IMolecule';
import {
    PageKind,
    getPageKind,
} from '../types/PageKind';
import {
    IMoleculeDataQuery,
    getMoleculeDataQuery,
} from '../types/IMoleculeDataQuery';



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

            getPositionMatrixEntries(
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, molecules)
            ),

            getPositionMatrixEntries(
                database,
                query,
                options.buildingBlockPositionMatrixCollection,
            )
            .then(
                addPositionMatrices(options.moleculeKey, molecules)
            ),

            Promise.all(
                valueCollections
                .map(getValueEntries(database, query))
                .map(promise => promise.then(
                    addValues(options.moleculeKey, molecules)
                ))
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
