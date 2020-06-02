import {
    ILoadedDatabaseBrowserBase,
    SortedKind,
} from './ILoadedDatabaseBrowserBase';


export const enum SortedType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedLoadedDatabaseBrowser
    extends ILoadedDatabaseBrowserBase
{
    sortedKind: SortedKind.Sorted;
    sortedCollection: string;
    sortedType: SortedType;
}
