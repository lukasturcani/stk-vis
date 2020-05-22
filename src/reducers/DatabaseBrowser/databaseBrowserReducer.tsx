import { combineReducers, Action } from '@reduxjs/toolkit';
import { IDatabaseBrowser } from '../../models';
import { moleculeTableReducer } from './moleculeTableReducer';
import {
    moleculeRequestStateReducer
} from './moleculeRequestStateReducer';
import { mongoDbStateReducer } from './mongoDbStateReducer';


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
        ),
    };
}
