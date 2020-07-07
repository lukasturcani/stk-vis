import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    ISortedLoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SortKind,
    SortSettingsKind,
} from '../../models';
import {
    setSortSettings
} from '../../actions';
import {
    urlReducer,
    moleculeKeyReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    constructedMoleculeCollectionReducer,
    buildingBlockPositionMatrixCollectionReducer,
    propertyCollectionsReducer,
    moleculeSelectionTypeReducer,
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
    getSortedCollection,
    getSortType,
    getMoleculeSelectionType,
} from '../../selectors';



export function sortedDatabaseBrowserReducer(
    state: ISortedLoadedDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
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
                    moleculeSelectionType:
                        moleculeSelectionTypeReducer(
                            getMoleculeSelectionType(state),
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

                    sortKind:
                        SortKind.Unsorted,
                };

            case SortSettingsKind.Sorted:
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
        moleculeSelectionType:
            moleculeSelectionTypeReducer(
                getMoleculeSelectionType(state),
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

        sortKind:
            SortKind.Sorted,

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


function assertNever(arg: never): never { throw Error(); }
