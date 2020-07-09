import { IStageOneResult } from './IStageOneResult';
import {
    PageKind,
} from '../../types';
import {
    getPageKind,
    addValues,
    getValuePromise,
    getPositionMatrixPromise,
    addPositionMatrices,
    getMoleculeDataQuery,
    IMoleculeDataQuery,
} from '../../utilities';


interface Options
{
    pageIndex: number;
    numEntriesPerPage: number;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    moleculeKey: string;
}


type IStageTwoResult = [PageKind, string[]];


export function stageTwo(
    options: Options,
)
    : (result: IStageOneResult) => Promise<IStageTwoResult>
{
    return ([
        database,
        valueCollections,
        molecules,
    ]: IStageOneResult)
        : Promise<IStageTwoResult> =>
    {
        const pageKind: PageKind
            = getPageKind({
                numItems: molecules.length,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage
            });

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(options.moleculeKey, molecules);

        const values: Promise<unknown>[]
            = valueCollections.map(getValuePromise(database, query))
            .map(addValues(molecules));

        const matrices: Promise<unknown>
            = getPositionMatrixPromise(
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(addPositionMatrices(molecules));

        const buildingBlockMatrices: Promise<unknown>
            = getPositionMatrixPromise(
                database,
                query,
                options.buildingBlockPositionMatrixCollection,
            )
            .then(addPositionMatrices(molecules));

        return Promise.all([
            Promise.resolve(pageKind),
            Promise.resolve(valueCollections),
            matrices,
            buildingBlockMatrices,
            ...values,
        ]);
    };
}
