import { AnyAction } from '@reduxjs/toolkit';
import { updateTable } from '../../../actions';


export function pageIndexReducer(
    state: number = 0,
    action: AnyAction,
)
    : number
{
    if (updateTable.match(action))
    {
        return action.payload.pageIndex;
    }
    return state;
}
