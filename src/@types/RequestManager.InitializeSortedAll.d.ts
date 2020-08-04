declare module 'RequestManager.InitializeSortedAll'
{
    import { PageKind } from 'RequestManager.PageKind';
    import { SortType } from 'RequestManager.SortType';


    export type InitializeSortedAll = Record<string, unknown>;

    export interface SortedAllData
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
        sortedCollection: string;
        sortType: SortType;
    }

    export const initializeSortedAll:
        (data: SortedAllData) => InitializeSortedAll;
}
