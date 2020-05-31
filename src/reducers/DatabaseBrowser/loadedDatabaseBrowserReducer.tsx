import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { loadedKindReducer } from './loadedKindReducer';
import { moleculesReducer } from './moleculesReducer';
import { visibleColumnsReducer } from './visibleColumnsReducer';
import { pageIndexReducer } from './pageIndexReducer';
import { numEntriesPerPageReducer } from '../numEntriesPerPageReducer';
import { pageKindReducer } from './pageKindReducer';
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
import {
    IDatabaseBrowser,
    ILoadedDatabaseBrowser,
} from '../../../models';
import { setInitialBrowserState } from '../../../actions';


const _loadedDatabaseBrowserReducer = combineReducers({
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
    numEntriesPerPage: numEntriesPerPageReducer ,
    pageKind: pageKindReducer,
});


export function loadedDatabaseBrowserReducer(
    state: ILoadedDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    if (setInitialBrowserState.match(action))
    {
        1;
    }
    return _loadedDatabaseBrowserReducer(state, action);
}
