import { AnyAction } from '@reduxjs/toolkit';
import { IColumnValues } from '../../../models';
import { updateTable } from '../../../actions';


export function columnValuesReducer(
    state: IColumnValues = {},
    action: AnyAction,
)
    : IColumnValues
{
    if (updateTable.match(action))
    {
        return action.payload.columnValues;
    }
    return state;
}
