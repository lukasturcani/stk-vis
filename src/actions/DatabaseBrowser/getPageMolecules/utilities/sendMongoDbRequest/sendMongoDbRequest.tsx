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

export function sendMongoDbRequest(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
    pageIndex: number,
    successSnackbar: (message: string) => void,
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

    const numEntriesPerPage: number
        = getNumEntriesPerPage(state);

    const currentPageData: Maybe<IPageData>
        = maybeGetPageData(state);

    MongoClient.connect(url, onConnection({
        database,
        moleculesCollection,
        propertyCollections,
        dispatch,
        numEntriesPerPage,
        pageIndex,
        currentPageData,
        successSnackbar,
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
