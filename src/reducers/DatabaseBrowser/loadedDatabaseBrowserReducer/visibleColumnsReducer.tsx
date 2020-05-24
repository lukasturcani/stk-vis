import { AnyAction } from '@reduxjs/toolkit';
import { IVisibleColumns } from '../../../models';
import { updateTable } from '../../../actions';


export function visibleColumnsReducer(
    state: IVisibleColumns = {},
    action: AnyAction,
)
    : IVisibleColumns
{
    if (updateTable.match(action))
    {
        return action.payload.visibleColumns;
    }
    return state;
}
