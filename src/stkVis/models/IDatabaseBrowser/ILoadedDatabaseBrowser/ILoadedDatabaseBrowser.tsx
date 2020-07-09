import {
    ISortedOne,
    ISortedBoth
} from './ISorted';
import {
    IUnsortedOne,
    IUnsortedBoth,
} from './IUnsorted';


export type ILoadedDatabaseBrowser =
    | ISortedBoth
    | ISortedOne
    | IUnsortedBoth
    | IUnsortedOne
