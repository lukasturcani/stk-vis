import { combineReducers } from '@reduxjs/toolkit';
import { loadedKindReducer } from './loadedKindReducer';
import { moleculesReducer } from './moleculesReducer';
import { visibleColumnsReducer } from './visibleColumnsReducer';
import { pageIndexReducer } from './pageIndexReducer';
import { entriesPerPageReducer } from './entriesPerPageReducer';
import {
    columnValuesReducer,
} from './columnValuesReducer';
import {
    moleculeRequestStateReducer,
} from './moleculeRequestStateReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    propertyCollectionsReducer,
} from '../mongoDbReducers';


export const loadedDatabaseBrowserReducer = combineReducers({
    kind: loadedKindReducer,
    url: urlReducer,
    database: databaseReducer,
    moleculeCollection: moleculeCollectionReducer,
    positionMatrixCollection: positionMatrixCollectionReducer,
    propertyCollections: propertyCollectionsReducer,
    moleculeRequestState: moleculeRequestStateReducer,
    molecules: moleculesReducer,
    visibleColumns: visibleColumnsReducer,
    columnValues: columnValuesReducer,
    pageIndex: pageIndexReducer,
    entriesPerPage: entriesPerPageReducer,
});
