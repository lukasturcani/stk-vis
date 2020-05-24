import { combineReducers } from '@reduxjs/toolkit';
import { initialKindReducer } from './initialKindReducer';
import {
    initialRequestStateReducer,
} from './initialRequestStateReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
} from '../mongoDbReducers';


export const initialDatabaseBrowserReducer = combineReducers({
    kind: initialKindReducer,
    url: urlReducer,
    database: databaseReducer,
    moleculeCollection: moleculeCollectionReducer,
    positionMatrixCollection: positionMatrixCollectionReducer,
    initialRequestState: initialRequestStateReducer,
});
