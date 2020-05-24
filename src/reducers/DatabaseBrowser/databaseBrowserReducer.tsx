import { AnyAction } from '@reduxjs/toolkit';
import { IDatabaseBrowser, DatabaseBrowserKind } from '../../models';
import {
    initialDatabaseBrowserReducer,
} from './initialDatabaseBrowserReducer';
import {
    loadedDatabaseBrowserReducer,
} from './loadedDatabaseBrowserReducer';


function assertNever(arg: never): never { throw Error(); }


export function databaseBrowserReducer(
    state: IDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    switch (state.kind) {
        case undefined:
        case DatabaseBrowserKind.Initial:
            return initialDatabaseBrowserReducer(state, action);

        case DatabaseBrowserKind.Loaded:
            return loadedDatabaseBrowserReducer(state, action);

        default:
            assertNever(state);
            break;
    }
}
