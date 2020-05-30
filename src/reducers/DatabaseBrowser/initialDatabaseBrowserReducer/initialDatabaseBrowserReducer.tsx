import { AnyAction } from '@reduxjs/toolkit';
import {
    initialRequestStateReducer,
} from './initialRequestStateReducer';
import {
    moleculeRequestStateReducer,
    moleculesReducer,
    visibleColumnsReducer,
    columnValuesReducer,
    pageIndexReducer,
    pageKindReducer,
} from '../loadedDatabaseBrowserReducer';
import { numEntriesPerPageReducer } from '../numEntriesPerPageReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    propertyCollectionsReducer,
} from '../mongoDbReducers';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
} from '../../../models';
import { updateTable } from '../../../actions';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbPropertyCollections,
    getNumEntriesPerPage,
    getInitialRequestState,
} from '../../../selectors';


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

            database:
                databaseReducer(undefined, action),

            moleculeCollection:
                moleculeCollectionReducer(undefined, action),

            positionMatrixCollection:
                positionMatrixCollectionReducer(undefined, action),

            initialRequestState:
                initialRequestStateReducer(undefined, action),

            propertyCollections:
                propertyCollectionsReducer(undefined, action),

            numEntriesPerPage:
                numEntriesPerPageReducer(undefined, action),
        };
    }

    if (updateTable.match(action))
    {
        return {

            kind:
                DatabaseBrowserKind.Loaded,

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

        };
    }
    return {
        kind:
            DatabaseBrowserKind.Initial,
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
