import {
    ILoadedDatabaseBrowserBase,
    SortedKind,
} from './ILoadedDatabaseBrowserBase';



export interface IUnsortedLoadedDatabaseBrowser
    extends ILoadedDatabaseBrowserBase
{
    sortedKind: SortedKind.Unsorted;
}
