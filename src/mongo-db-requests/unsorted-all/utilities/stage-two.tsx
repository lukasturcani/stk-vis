import { IStageOneResult } from './IStageOneResult';
import { PageKind } from '../../types';
import { getPageKind } from '../../utilities';


interface Options
{
    pageIndex: number;
    numEntriesPerPage: number;
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

        const data: IDatabaseData
            =

        return client;
        return valueCollections;
        return pageKind;
        return result;
    };
}
