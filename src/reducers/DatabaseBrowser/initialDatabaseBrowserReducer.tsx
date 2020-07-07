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
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    constructedMoleculeCollectionReducer,
    positionMatrixCollectionReducer,
    buildingBlockPositionMatrixCollectionReducer,
    propertyCollectionsReducer,
    moleculeSelectionTypeReducer,
    moleculeKeyReducer,
} from './mongoDbReducers';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SortKind,
    MoleculeSelectionTypeKind,
    IMoleculeSelectionType,
} from '../../models';
import { updateTable } from '../../actions';
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
    getMoleculeSelectionType,
} from '../../selectors';


export function initialDatabaseBrowserReducer(
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

            moleculeSelectionType:
                moleculeSelectionTypeReducer(undefined, action),
        };
    }

    const selectionType: IMoleculeSelectionType
        = getMoleculeSelectionType(state);

    switch (selectionType.kind)
    {
        case MoleculeSelectionTypeKind.Both:
            if (updateTable.match(action))
            {
                return {

                    kind:
                        DatabaseBrowserKind.Loaded,

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

                    moleculeSelectionType: selectionType,

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

                    sortKind:
                        SortKind.Unsorted,

                };
            }
            break;

        case MoleculeSelectionTypeKind.BuildingBlocks:
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            if (updateTable.match(action))
            {
                return {

                    kind:
                        DatabaseBrowserKind.Loaded,

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

                    moleculeSelectionType: selectionType,

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

                    sortKind:
                        SortKind.Unsorted,

                };
            }
            break;
    }

    return {
        kind:
            DatabaseBrowserKind.Initial,
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

        moleculeSelectionType:
            moleculeSelectionTypeReducer(
                getMoleculeSelectionType(state),
                action,
            ),

    };
}
