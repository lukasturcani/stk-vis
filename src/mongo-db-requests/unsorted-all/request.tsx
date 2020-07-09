import {
    MongoClient,
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
    stageOne,
    stageTwo,
    getSuccessResult,
} from './utilities';



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
    .then(stageOne({...options, nonValueCollections}))
    .then(stageTwo(options))
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
            throw err;
        }
    );
}
