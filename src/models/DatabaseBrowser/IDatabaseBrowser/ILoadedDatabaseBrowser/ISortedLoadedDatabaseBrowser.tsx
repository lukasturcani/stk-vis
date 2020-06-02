import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';


export const enum SortType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedLoadedDatabaseBrowser
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Sorted;
    sortedCollection: string;
    sortType: SortType;
}
