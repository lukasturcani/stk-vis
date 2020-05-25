import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPropertyCollections,
    getPageIndex,
    getNumEntriesPerPage,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
} from '../../../../../models';
import { MongoClient } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import { onConnection } from './onConnection';


function assertNever(arg: never): never { throw Error(); }


function getPageIndex_(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
)
    : number
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return 0;
        case DatabaseBrowserKind.Loaded:
            return getPageIndex(state);
        default:
            assertNever(state);
    }
}


export function sendMongoDbRequest(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
    dispatch: (arg: AnyAction) => void,
)
    : void
{
    const url: string
        = getMongoDbUrl(state);

    const database: string
        = getMongoDbDatabase(state);

    const moleculesCollection: string
        = getMongoDbMoleculeCollection(state);

    const propertyCollections: string[]
        = getMongoDbPropertyCollections(state);

    const pageIndex: number
        = getPageIndex_(state);

    const entriesPerPage: number
        = getNumEntriesPerPage(state);

    MongoClient.connect(url, onConnection({
        database,
        moleculesCollection,
        propertyCollections,
        dispatch,
    }));
}
