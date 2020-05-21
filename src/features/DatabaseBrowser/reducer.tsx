import { combineReducers } from '@reduxjs/toolkit';

import { IDatabaseBrowser } from './model';
import {
    moleculeTableReducer,
    moleculeRequestStateReducer,
    mongoDbStateReducer,
} from './features';


export const DatabaseBrowserReducer
    : (state: IDatabaseBrowser, action: any) => IDatabaseBrowser
= combineReducers({
    moleculeTable: moleculeTableReducer,
    moleculeRquestState: moleculeRequestStateReducer,
    mongoDbState: mongoDbStateReducer,
});
