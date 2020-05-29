import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPropertyCollections,
    getPageIndex,
    getNumEntriesPerPage,
    getTableMolecules,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
} from '../../../../../models';
import { MongoClient } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import { onConnection } from './onConnection';
import {
    Maybe,
    Nothing,
    Just,
} from '../../../../../utilities';
import { IPageData } from './interfaces';


interface sendMongoDbRequestOptions
{
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser;
    pageIndex: number;
    successSnackbar: (message: string) => void;
    failureSnackbar: (message: string) => void;
    dispatch: (arg: AnyAction) => void;
}

export function sendMongoDbRequest(
    options: sendMongoDbRequestOptions,
)
    : void
{
    const url: string
        = getMongoDbUrl(options.state);

    const database: string
        = getMongoDbDatabase(options.state);

    const moleculesCollection: string
        = getMongoDbMoleculeCollection(options.state);

    const propertyCollections: string[]
        = getMongoDbPropertyCollections(options.state);

    const numEntriesPerPage: number
        = getNumEntriesPerPage(options.state);

    const currentPageData: Maybe<IPageData>
        = maybeGetPageData(options.state);

    MongoClient.connect(url, onConnection({
        database,
        moleculesCollection,
        propertyCollections,
        numEntriesPerPage,
        currentPageData,
        ...options
    }));
}



function maybeGetPageData(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
)
    : Maybe<IPageData>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just({
                pageIndex: getPageIndex(state),
                numMolecules: getTableMolecules(state).length,
            });

        default:
            assertNever(state);
    }
}


function assertNever(arg: never): never { throw Error(); }
