import { combineReducers } from '@reduxjs/toolkit';
import { loadedKindReducer } from './loadedKindReducer';
import { moleculesReducer } from './moleculesReducer';
import { visibleColumnsReducer } from './visibleColumnsReducer';
import {
    moleculeRequestStateReducer,
} from './moleculeRequestStateReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
} from '../mongoDbReducers';


export const loadedDatabaseBrowserReducer = combineReducers({
    kind: loadedKindReducer,
    url: urlReducer,
    database: databaseReducer,
    moleculeCollection: moleculeCollectionReducer,
    positionMatrixCollection: positionMatrixCollectionReducer,
    moleculeRequestState: moleculeRequestStateReducer,
    molecules: moleculesReducer,
    visibleColumns: visibleColumnsReducer,
});
