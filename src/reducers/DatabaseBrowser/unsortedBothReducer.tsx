import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    IUnsortedBoth,
    DatabaseBrowserKind,
    SearchKind,
    SortSettingsKind,
    InitialRequestStateKind,
} from '../../models';
import {
    urlReducer,
    moleculeKeyReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    constructedMoleculeCollectionReducer,
    buildingBlockPositionMatrixCollectionReducer,
    propertyCollectionsReducer,
} from './mongoDbReducers';
import {
    moleculeRequestStateReducer,
} from './moleculeRequestStateReducer';
import {
    moleculesReducer
} from './moleculesReducer';
import {
    visibleColumnsReducer
} from './visibleColumnsReducer';
import {
    columnValuesReducer
} from './columnValuesReducer';
import {
    pageIndexReducer,
} from './pageIndexReducer';
import {
    numEntriesPerPageReducer
} from './numEntriesPerPageReducer';
import {
    pageKindReducer
} from './pageKindReducer';
import {
    sortedCollectionReducer
} from './sortedCollectionReducer';
import {
    sortTypeReducer
} from './sortTypeReducer';
import {
    selectedMoleculeReducer
} from './selectedMoleculeReducer';
import {
    initialKindReducer,
} from './initialKindReducer';
import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbPropertyCollections,
    getMongoDbPositionMatrixCollection,
    getMongoDbMoleculeCollection,
    getMongoDbBuildingBlockPositionMatrixCollection
    as BBPosMatCollection,
    getMongoDbConstructedMoleculeCollection,
    getMoleculeRequestState,
    getTableMolecules,
    getVisibleColumns,
    getColumnValues,
    getPageIndex,
    getNumEntriesPerPage,
    getPageKind,
    getSelectedMolecule,
    getDatabaseBrowserKind,
} from '../../selectors';
import {
    setSortSettings,
    setInitialBrowserState,
} from '../../actions';



export function unsortedBothReducer(
    state: IUnsortedBoth,
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
                    BBPosMatCollection(state),
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

            searchKind:
                state.searchKind,
        };
    }

    if (setSortSettings.match(action))
    {
        switch(action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                // Use default case.
                break;

            case SortSettingsKind.Sorted:
                return {
                    kind:
                        DatabaseBrowserKind.Loaded,
                    url:
                        urlReducer(
                            getMongoDbUrl(state),
                            action,
                        ),
                    moleculeKey:
                        moleculeKeyReducer(
                            getMongoDbMoleculeKey(state),
                            action,
                        ),
                    database:
                        databaseReducer(
                            getMongoDbDatabase(state),
                            action,
                        ),
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
                    constructedMoleculeCollection:
                        constructedMoleculeCollectionReducer(
                            getMongoDbConstructedMoleculeCollection(
                                state
                            ),
                            action,
                        ),
                    buildingBlockPositionMatrixCollection:
                        buildingBlockPositionMatrixCollectionReducer(
                            BBPosMatCollection(state),
                            action,
                        ),
                    propertyCollections:
                        propertyCollectionsReducer(
                            getMongoDbPropertyCollections(state),
                            action,
                        ),
                    moleculeRequestState:
                        moleculeRequestStateReducer(
                            getMoleculeRequestState(state),
                            action,
                        ),
                    molecules:
                        moleculesReducer(
                            getTableMolecules(state),
                            action,
                        ),
                    visibleColumns:
                        visibleColumnsReducer(
                            getVisibleColumns(state),
                            action,
                        ),
                    columnValues:
                        columnValuesReducer(
                            getColumnValues(state),
                            action,
                        ),
                    pageIndex:
                        pageIndexReducer(
                            getPageIndex(state),
                            action,
                        ),
                    numEntriesPerPage:
                        numEntriesPerPageReducer(
                            getNumEntriesPerPage(state),
                            action,
                        ),

                    searchKind:
                        SearchKind.SortedBoth,

                    pageKind:
                        pageKindReducer(
                            getPageKind(state),
                            action,
                        ),
                    selectedMolecule:
                        selectedMoleculeReducer(
                            getSelectedMolecule(state),
                            action,
                        ),

                    sortedCollection:
                        sortedCollectionReducer(
                            undefined,
                            action,
                        ),
                    sortType:
                        sortTypeReducer(
                            undefined,
                            action,
                        ),
                };

            default:
                assertNever(action.payload);
        }
    }
    return {
        kind:
            DatabaseBrowserKind.Loaded,
        url:
            urlReducer(
                getMongoDbUrl(state),
                action,
            ),
        moleculeKey:
            moleculeKeyReducer(
                getMongoDbMoleculeKey(state),
                action,
            ),
        database:
            databaseReducer(
                getMongoDbDatabase(state),
                action,
            ),
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
        constructedMoleculeCollection:
            constructedMoleculeCollectionReducer(
                getMongoDbConstructedMoleculeCollection(state),
                action,
            ),
        buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollectionReducer(
                BBPosMatCollection(state),
                action,
            ),
        propertyCollections:
            propertyCollectionsReducer(
                getMongoDbPropertyCollections(state),
                action,
            ),
        moleculeRequestState:
            moleculeRequestStateReducer(
                getMoleculeRequestState(state),
                action,
            ),
        molecules:
            moleculesReducer(
                getTableMolecules(state),
                action,
            ),
        visibleColumns:
            visibleColumnsReducer(
                getVisibleColumns(state),
                action,
            ),
        columnValues:
            columnValuesReducer(
                getColumnValues(state),
                action,
            ),
        pageIndex:
            pageIndexReducer(
                getPageIndex(state),
                action,
            ),
        numEntriesPerPage:
            numEntriesPerPageReducer(
                getNumEntriesPerPage(state),
                action,
            ),

        searchKind:
            state.searchKind,

        pageKind:
            pageKindReducer(
                getPageKind(state),
                action,
            ),
        selectedMolecule:
            selectedMoleculeReducer(
                getSelectedMolecule(state),
                action,
            ),

    };
}



function assertNever(arg: never): never { throw Error(); }
