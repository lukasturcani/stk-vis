import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';



export interface IUnsortedLoadedDatabaseBrowser
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Unsorted;
}
