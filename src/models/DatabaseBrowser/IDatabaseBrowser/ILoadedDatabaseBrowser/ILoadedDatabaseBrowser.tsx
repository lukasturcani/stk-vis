import {
    ISortedLoadedDatabaseBrowser,
} from './ISortedLoadedDatabaseBrowser';
import {
    IUnsortedLoadedDatabaseBrowser,
} from './IUnsortedLoadedDatabaseBrowser';


export type ILoadedDatabaseBrowser =
    | ISortedLoadedDatabaseBrowser
    | IUnsortedLoadedDatabaseBrowser
