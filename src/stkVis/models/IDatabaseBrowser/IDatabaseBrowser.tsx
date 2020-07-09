import { IInitialDatabaseBrowser } from './IInitialDatabaseBrowser';
import { ILoadedDatabaseBrowser } from './ILoadedDatabaseBrowser';

export type IDatabaseBrowser
    = IInitialDatabaseBrowser
    | ILoadedDatabaseBrowser;
