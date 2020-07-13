import { AnyAction } from '@reduxjs/toolkit';
import {
    initialRequestStateReducer,
} from './initialRequestStateReducer';
import {
    moleculeRequestStateReducer
} from './moleculeRequestStateReducer';
import { moleculesReducer } from './moleculesReducer';
import { visibleColumnsReducer } from './visibleColumnsReducer';
import { columnValuesReducer } from './columnValuesReducer';
import { pageIndexReducer } from './pageIndexReducer';
import { pageKindReducer } from './pageKindReducer';
import { numEntriesPerPageReducer } from './numEntriesPerPageReducer';
import { selectedMoleculeReducer } from './selectedMoleculeReducer';
import { initialSearchKindReducer } from './searchKindReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    constructedMoleculeCollectionReducer,
    positionMatrixCollectionReducer,
    buildingBlockPositionMatrixCollectionReducer,
    propertyCollectionsReducer,
    moleculeKeyReducer,
} from './mongoDbReducers';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SearchKind,
} from '../../models';
import { updateTable } from 'actions/updateTable';
import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbBuildingBlockPositionMatrixCollection
    as getBBPosMatCol,
    getMongoDbPropertyCollections,
    getNumEntriesPerPage,
    getInitialRequestState,
} from '../../selectors';


export function reducer(
    state: IInitialDatabaseBrowser | undefined,
    action: AnyAction,
)
    : ILoadedDatabaseBrowser | IInitialDatabaseBrowser
{
    if (state === undefined)
    {
        return {

            kind:
                DatabaseBrowserKind.Initial,

            searchKind:
                SearchKind.UnsortedBoth,

            url:
                urlReducer(undefined, action),

            moleculeKey:
                moleculeKeyReducer(undefined, action),

            database:
                databaseReducer(undefined, action),

            moleculeCollection:
                moleculeCollectionReducer(undefined, action),

            constructedMoleculeCollection:
                constructedMoleculeCollectionReducer(
                    undefined,
                    action
                ),

            positionMatrixCollection:
                positionMatrixCollectionReducer(undefined, action),

            buildingBlockPositionMatrixCollection:
                buildingBlockPositionMatrixCollectionReducer(
                    undefined,
                    action,
                ),

            initialRequestState:
                initialRequestStateReducer(undefined, action),

            propertyCollections:
                propertyCollectionsReducer(undefined, action),

            numEntriesPerPage:
                numEntriesPerPageReducer(undefined, action),

        };
    }

    switch (state.searchKind)
    {
        case SearchKind.UnsortedBoth:
            if (updateTable.match(action))
            {
                return {

                    kind:
                        DatabaseBrowserKind.Loaded,

                    searchKind:
                        state.searchKind,

                    url:
                        urlReducer(getMongoDbUrl(state), action),

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

                    constructedMoleculeCollection:
                        constructedMoleculeCollectionReducer(
                            getMongoDbConstructedMoleculeCollection(
                                state,
                            ),
                            action
                        ),

                    positionMatrixCollection:
                        positionMatrixCollectionReducer(
                            getMongoDbPositionMatrixCollection(state),
                            action,
                        ),

                    buildingBlockPositionMatrixCollection:
                        buildingBlockPositionMatrixCollectionReducer(
                            getBBPosMatCol(state),
                            action,
                        ),

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


                    moleculeRequestState:
                        moleculeRequestStateReducer(undefined, action),

                    molecules:
                        moleculesReducer(undefined, action),

                    visibleColumns:
                        visibleColumnsReducer(undefined, action),

                    columnValues:
                        columnValuesReducer(undefined, action),

                    pageIndex:
                        pageIndexReducer(undefined, action),

                    pageKind:
                        pageKindReducer(undefined, action),

                    selectedMolecule:
                        selectedMoleculeReducer(undefined, action),
                };
            }
            break;

        case SearchKind.UnsortedBuildingBlocks:
        case SearchKind.UnsortedConstructedMolecules:
            if (updateTable.match(action))
            {
                return {

                    kind:
                        DatabaseBrowserKind.Loaded,

                    searchKind:
                        state.searchKind,

                    url:
                        urlReducer(getMongoDbUrl(state), action),

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

                    constructedMoleculeCollection:
                        constructedMoleculeCollectionReducer(
                            getMongoDbConstructedMoleculeCollection(
                                state,
                            ),
                            action
                        ),

                    positionMatrixCollection:
                        positionMatrixCollectionReducer(
                            getMongoDbPositionMatrixCollection(state),
                            action,
                        ),

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


                    moleculeRequestState:
                        moleculeRequestStateReducer(undefined, action),

                    molecules:
                        moleculesReducer(undefined, action),

                    visibleColumns:
                        visibleColumnsReducer(undefined, action),

                    columnValues:
                        columnValuesReducer(undefined, action),

                    pageIndex:
                        pageIndexReducer(undefined, action),

                    pageKind:
                        pageKindReducer(undefined, action),

                    selectedMolecule:
                        selectedMoleculeReducer(undefined, action),
                };
            }
            break;

        default:
            assertNever(state.searchKind);
    }

    return {
        kind:
            DatabaseBrowserKind.Initial,

        searchKind:
            initialSearchKindReducer(state.searchKind, action),

        url:
            urlReducer(getMongoDbUrl(state), action),

        moleculeKey:
            moleculeKeyReducer(getMongoDbMoleculeKey(state), action),

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
                action
            ),

        positionMatrixCollection:
            positionMatrixCollectionReducer(
                getMongoDbPositionMatrixCollection(state),
                action,
            ),

        buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollectionReducer(
                getBBPosMatCol(state),
                action,
            ),

        initialRequestState:
            initialRequestStateReducer(
                getInitialRequestState(state),
                action,
            ),

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


function assertNever(arg: never): never { throw Error(); }
