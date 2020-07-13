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
    state: IDatabaseBrowser | undefined,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    if (state === undefined)
    {
        return initialDatabaseBrowserReducer(state, action);
    }

    switch (state.kind) {
        case DatabaseBrowserKind.Initial:
            return initialDatabaseBrowserReducer(state, action);

        case DatabaseBrowserKind.Loaded:
            return loadedDatabaseBrowserReducer(state, action);

        default:
            assertNever(state);
            break;
    }
}
