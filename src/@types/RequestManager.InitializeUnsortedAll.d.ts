declare module 'RequestManager.InitializeUnsortedAll'
{
    import { PageKind } from 'RequestManager.PageKind';


    export type InitializeUnsortedAll = Record<string, unknown>;

    export interface UnsortedAllData
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
        pageKind: PageKind;
    }

    export const initializeUnsortedAll:
        (data: UnsortedAllData) => InitializeUnsortedAll;
}
