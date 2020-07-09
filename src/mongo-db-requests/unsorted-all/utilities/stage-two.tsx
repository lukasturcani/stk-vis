import { IStageOneResult } from './IStageOneResult';
import {
    PageKind,
    IMolecule,
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


export type IStageTwoResult = [PageKind, string[], IMolecule[]];


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
                numItems: molecules.size,
                pageIndex: options.pageIndex,
                numEntriesPerPage: options.numEntriesPerPage
            });

        const query: IMoleculeDataQuery
            = getMoleculeDataQuery(options.moleculeKey, molecules);

        const values: Promise<void>[]
            = valueCollections.map(getValuePromise(database, query))
            .map(addValues(options.moleculeKey, molecules));

        const constructedMolecules: Promise<IMolecule[]>
            = getPositionMatrixPromise(
                database,
                query,
                options.positionMatrixCollection,
            )
            .then(addPositionMatrices(options.moleculeKey, molecules));

        const buildingBlocks: Promise<IMolecule[]>
            = getPositionMatrixPromise(
                database,
                query,
                options.buildingBlockPositionMatrixCollection,
            )
            .then(addPositionMatrices(options.moleculeKey, molecules));

        return Promise.all([
            Promise.resolve(pageKind),
            Promise.resolve(valueCollections),
            constructedMolecules,
            buildingBlocks,
            Promise.all(values),
        ])
        .then(([
            pageKind,
            valueCollections,
            molecules,
            buildingBlocks,
        ]) => {
            molecules.push(...buildingBlocks);
            return [pageKind, valueCollections, molecules];
        });
    };
}
