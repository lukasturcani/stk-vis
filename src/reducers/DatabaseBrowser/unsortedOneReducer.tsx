import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    IUnsortedOne,
    DatabaseBrowserKind,
    SearchKind,
    SortSettingsKind,
} from '../../models';
import {
    urlReducer,
    moleculeKeyReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    constructedMoleculeCollectionReducer,
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
} from '../../selectors';
import {
    setSortSettings
} from '../../actions';



export function unsortedOneReducer(
    state: IUnsortedOne,
    action: AnyAction,
)
    : IDatabaseBrowser
{
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
                        toSorted(state.searchKind),

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

    };
}


function toSorted(
    searchKind:
        SearchKind.UnsortedBuildingBlocks
        | SearchKind.UnsortedConstructedMolecules,
)
    : SearchKind.SortedBuildingBlocks
    | SearchKind.SortedConstructedMolecules
{
    return (
        searchKind === SearchKind.UnsortedBuildingBlocks
    )
        ? SearchKind.SortedBuildingBlocks
        : SearchKind.SortedConstructedMolecules;
}



function assertNever(arg: never): never { throw Error(); }
