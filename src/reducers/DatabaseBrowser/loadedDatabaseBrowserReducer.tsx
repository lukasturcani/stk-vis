import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { loadedKindReducer } from './loadedKindReducer';
import { moleculesReducer } from './moleculesReducer';
import { visibleColumnsReducer } from './visibleColumnsReducer';
import { pageIndexReducer } from './pageIndexReducer';
import { numEntriesPerPageReducer } from './numEntriesPerPageReducer';
import { pageKindReducer } from './pageKindReducer';
import {
    columnValuesReducer,
} from './columnValuesReducer';
import {
    moleculeRequestStateReducer,
} from './moleculeRequestStateReducer';
import { selectedMoleculeReducer } from './selectedMoleculeReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    propertyCollectionsReducer,
} from './mongoDbReducers';
import {
    IDatabaseBrowser,
    InitialRequestStateKind,
    ILoadedDatabaseBrowser,
} from '../../models';
import { setInitialBrowserState } from '../../actions';
import { initialKindReducer } from './initialKindReducer';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbPropertyCollections,
    getNumEntriesPerPage,
    getDatabaseBrowserKind,
} from '../../selectors';


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
    numEntriesPerPage: numEntriesPerPageReducer,
    pageKind: pageKindReducer,
    selectedMolecule: selectedMoleculeReducer,
});


export function loadedDatabaseBrowserReducer(
    state: ILoadedDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    if (setInitialBrowserState.match(action))
    {
        return {
            kind:
                initialKindReducer(
                    getDatabaseBrowserKind(state),
                    action,
                ),

            url:
                urlReducer(getMongoDbUrl(state), action),

            database:
                databaseReducer(getMongoDbDatabase(state), action),

            moleculeCollection:
                moleculeCollectionReducer(
                    getMongoDbMoleculeCollection(state),
                    action,
                ),

            positionMatrixCollection:
                positionMatrixCollectionReducer(
                    getMongoDbPositionMatrixCollection(state),
                    action,
                ),

            initialRequestState:
                {
                    kind: InitialRequestStateKind.NoRequestSent,
                },

            propertyCollections:
                propertyCollectionsReducer(
                    getMongoDbPropertyCollections(state),
                    action,
                ),

            numEntriesPerPage:
                numEntriesPerPageReducer(
                    getNumEntriesPerPage(state),
                    action,
                ),

        };
    }
    return _loadedDatabaseBrowserReducer(state, action);
}
