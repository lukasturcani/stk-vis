import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    ISortedOne,
    DatabaseBrowserKind,
    SearchKind,
    InitialRequestStateKind,
    SortSettingsKind,
} from '../../models';
import {
    setSortSettings,
    setInitialBrowserState,
} from '../../actions';
import {
    urlReducer,
    moleculeKeyReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    constructedMoleculeCollectionReducer,
    propertyCollectionsReducer,
    buildingBlockPositionMatrixCollectionReducer,
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
    selectedMoleculeReducer
} from './selectedMoleculeReducer';
import {
    sortedCollectionReducer
} from './sortedCollectionReducer';
import {
    sortTypeReducer
} from './sortTypeReducer';
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
    getMongoDbConstructedMoleculeCollection,
    getMoleculeRequestState,
    getTableMolecules,
    getVisibleColumns,
    getColumnValues,
    getPageIndex,
    getNumEntriesPerPage,
    getPageKind,
    getSelectedMolecule,
    getSortedCollection,
    getSortType,
    getDatabaseBrowserKind,
} from '../../selectors';



export function sortedOneReducer(
    state: ISortedOne,
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
                    undefined,
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
                toUnsorted(state.searchKind),
        };
    }
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return  {
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
                                state,
                            ),
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

                    searchKind:
                        toUnsorted(state.searchKind),
                };

            case SortSettingsKind.Sorted:
                // Use the default case.
                break;

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

        searchKind:
            state.searchKind,

        sortedCollection:
            sortedCollectionReducer(
                getSortedCollection(state),
                action,
            ),
        sortType:
            sortTypeReducer(
                getSortType(state),
                action,
            ),
    };
}


function toUnsorted(
    searchKind:
        SearchKind.SortedBuildingBlocks
        | SearchKind.SortedConstructedMolecules
)
    : SearchKind.UnsortedBuildingBlocks
    | SearchKind.UnsortedConstructedMolecules
{
    switch (searchKind)
    {
        case SearchKind.SortedBuildingBlocks:
            return SearchKind.UnsortedBuildingBlocks;

        case SearchKind.SortedConstructedMolecules:
            return SearchKind.UnsortedConstructedMolecules;

        default:
            assertNever(searchKind);
    }
}


function assertNever(arg: never): never { throw Error(); }
