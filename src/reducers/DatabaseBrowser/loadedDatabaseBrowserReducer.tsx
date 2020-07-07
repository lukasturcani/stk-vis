import { AnyAction } from '@reduxjs/toolkit';
import { numEntriesPerPageReducer } from './numEntriesPerPageReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    constructedMoleculeCollectionReducer,
    buildingBlockPositionMatrixCollectionReducer,
    propertyCollectionsReducer,
    moleculeKeyReducer,
} from './mongoDbReducers';
import {
    IDatabaseBrowser,
    InitialRequestStateKind,
    ILoadedDatabaseBrowser,
    SortKind,
} from '../../models';
import { setInitialBrowserState } from '../../actions';
import { initialKindReducer } from './initialKindReducer';
import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbBuildingBlockPositionMatrixCollection,
    getMongoDbPropertyCollections,
    getNumEntriesPerPage,
    getDatabaseBrowserKind,
} from '../../selectors';
import {
    unsortedDatabaseBrowserReducer,
} from './unsortedDatabaseBrowserReducer';
import {
    sortedDatabaseBrowserReducer,
} from './sortedDatabaseBrowserReducer';




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

            moleculeKey:
                moleculeKeyReducer(
                    getMongoDbMoleculeKey(state),
                    action,
                ),

            database:
                databaseReducer(getMongoDbDatabase(state), action),

            moleculeCollection:
                moleculeCollectionReducer(
                    getMongoDbMoleculeCollection(state),
                    action,
                ),

            constructedMoleculeCollection:
                constructedMoleculeCollectionReducer(
                    getMongoDbConstructedMoleculeCollection(state),
                    action,
                ),

            positionMatrixCollection:
                positionMatrixCollectionReducer(
                    getMongoDbPositionMatrixCollection(state),
                    action,
                ),

            buildingBlockPositionMatrixCollection:
                buildingBlockPositionMatrixCollectionReducer(
                    getMongoDbBuildingBlockPositionMatrixCollection(
                        state.buildingBlock,
                    ),
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

            moleculeSelectionKind:
                state.moleculeSelectionKind,
        };
    }
    switch( state.sortKind)
    {
        case SortKind.Unsorted:
            return unsortedDatabaseBrowserReducer(state, action);

        case SortKind.Sorted:
            return sortedDatabaseBrowserReducer(state, action);

        default:
            assertNever(state);
    }
}


function assertNever(arg: never): never { throw Error(); }
