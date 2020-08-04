declare module 'RequestManager.InitializeUnsortedBuildingBlocks'
{
    import { PageKind } from 'RequestManager.PageKind';


    export type InitializeUnsortedBuildingBlocks
        = Record<string, unknown>;

    export interface UnsortedBuildingBlocksData
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
    }

    export const initializeSortedAll:
        (data: UnsortedBuildingBlocksData) =>
        InitializeUnsortedBuildingBlocks;
}
