import { combineReducers } from '@reduxjs/toolkit';
import { IDatabaseBrowser } from '../../models';
import { moleculeTableReducer } from './moleculeTableReducer';
import {
    moleculeRequestStateReducer
} from './moleculeRequestStateReducer';
import { mongoDbStateReducer } from './mongoDbStateReducer';


export const databaseBrowserReducer = combineReducers({
    moleculeTable: moleculeTableReducer,
    moleculeRequestState: moleculeRequestStateReducer,
    mongoDbState: mongoDbStateReducer,
});
