declare module 'RequestManager.InitializeSortedBuildingBlocks'
{
    import { PageKind } from 'RequestManager.PageKind';
    import { SortType } from 'RequestManager.SortType';


    export type InitializeSortedBuildingBlocks
        = Record<string, unknown>;

    export interface SortedBuildingBlocksData
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
        pageKind: PageKind;
        sortedCollection: string;
        sortType: SortType;
    }

    export const initializeSortedBuildingBlocks:
        (data: SortedBuildingBlocksData) =>
        InitializeSortedBuildingBlocks;
}
