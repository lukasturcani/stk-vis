import { AnyAction } from '@reduxjs/toolkit';
import {
    databaseBrowserKindReducer
} from '../databaseBrowserKindReducer';
import {
    initialRequestStateReducer,
} from './initialRequestStateReducer';
import {
    moleculeRequestStateReducer,
    moleculesReducer,
    visibleColumnsReducer,
} from '../loadedDatabaseBrowserReducer';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
} from '../mongoDbReducers';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
} from '../../../models';
import { updateTable } from '../../../actions';
import {
    getDatabaseBrowserKind,
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
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

            moleculeRequestState:
                moleculeRequestStateReducer(undefined, action),

            molecules:
                moleculesReducer(undefined, action),

            visibleColumns:
                visibleColumnsReducer(undefined, action),
        };
    }
    return state;
}
