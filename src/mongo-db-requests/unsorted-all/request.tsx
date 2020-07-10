import {
    MongoClient,
    Db,
} from 'mongodb';
import {
    IResult,
    ResultKind,
} from './IResult';
import {
    DatabaseConnectionError,
    CollectionConnectionError,
} from '../errors';
import {
    getMoleculeEntries,
    stageTwo,
    getSuccessResult,
} from './utilities';
import {
    IPartialMolecules,
} from '../types';
import {
    getValueCollections,
    getPartialMolecules,
    getPageKind,
    getMoleculeDataQuery,
    IMoleculeDataQuery,
    getPositionMatrixPromise,
    addPositionMatrices,
} from '../utilities';



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

    .then(([pageKind, valueCollections, molecules, buildingBlocks]) =>
    {
        molecules.push(...buildingBlocks);
        return [pageKind, valueCollections, molecules];
    })

    .then(getSuccessResult)

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
