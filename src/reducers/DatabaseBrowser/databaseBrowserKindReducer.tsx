import { AnyAction } from '@reduxjs/toolkit';
import { DatabaseBrowserKind } from '../../models';
import { updateTable } from '../../actions';


export function databaseBrowserKindReducer(
    state: DatabaseBrowserKind = DatabaseBrowserKind.Initial,
    action: AnyAction,
)
    : DatabaseBrowserKind
{
    if (updateTable.match(action))
    {
        return DatabaseBrowserKind.Loaded;
    }
    return state;
}
