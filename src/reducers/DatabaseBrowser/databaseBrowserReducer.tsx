import { combineReducers, Action } from '@reduxjs/toolkit';
import { IDatabaseBrowser } from './model';
import {
    moleculeTableReducer,
    moleculeRequestStateReducer,
    mongoDbStateReducer,
} from './features';


export function databaseBrowserReducer(
    state: IDatabaseBrowser,
    action: Action,
): IDatabaseBrowser
{
    return {
        moleculeTable: moleculeTableReducer(
            state.moleculeTable,
            action,
        ),
        moleculeRequestState: moleculeRequestStateReducer(
            state.moleculeRequestState,
            action,
        ),
        mongoDbState: mongoDbStateReducer(
            state.mongoDbState,
            action,
        )
    };
}
