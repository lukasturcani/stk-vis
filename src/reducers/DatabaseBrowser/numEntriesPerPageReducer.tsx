import { AnyAction } from '@reduxjs/toolkit';
import { updateMongoDbFields } from '../../actions';


export function numEntriesPerPageReducer(
    state: number = 34,
    action: AnyAction,
)
    : number
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.numEntriesPerPage;
    }
    return state;
}
