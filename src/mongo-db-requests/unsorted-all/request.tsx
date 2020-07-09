import {
    MongoClient,
    Db,
} from 'mongodb';
import {
    IResult,
    IDatabaseConnectionError,
    ResultKind,
} from './IResult';
import {
    ICollectionData,
    IMoleculeEntry,
    PageKind,
} from '../types';
import {
    getPageKind
} from '../utilities';
import {
    stageOne,
    stageTwo,
} from './utilities';



interface Options
{
    url: string;
    database: string;
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
    .then(stageOne({...options, nonValueCollections}))
    .then(stageTwo(options))
    .then(
        () => {
            return {
                kind: ResultKind.Success,
                molecules: [],
            };
        }
    )
    .catch(
        (err: IResult) =>
        {
            return err;
        }
    );
}