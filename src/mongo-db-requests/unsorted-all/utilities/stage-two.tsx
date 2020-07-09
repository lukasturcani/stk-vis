import { IStageOneResult } from './IStageOneResult';
import { PageKind, ValueEntry } from '../../types';
import { getPageKind } from '../../utilities';
import { getValuePromises } from './utilities';


interface Options
{
    pageIndex: number;
    numEntriesPerPage: number;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    moleculeKey: string;
}


type IStageTwoResult = any;


export function stageTwo(
    options: Options,
)
    : (result: IStageOneResult) => Promise<IStageTwoResult>
{
    return ([
        client,
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

        const values: Promise<IValueEntries>[]
            = valueCollections.map(getValuePromise(client, query))
            .map(addValues(molecules));

        const matrices: Promise<IPositionMatrixEntries>
            = getPositionMatrixPromise(
                client,
                query,
                options.positionMatrixCollection,
            )
            .then(addPositionMatrices(molecules));

        const buildingBlockMatrices: Promise<IPositionMatrixEntries>
            = getPositionMatrixPromise(
                client,
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
