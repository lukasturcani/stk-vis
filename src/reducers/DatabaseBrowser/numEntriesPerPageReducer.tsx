import { AnyAction } from '@reduxjs/toolkit';


export function numEntriesPerPageReducer(
    state: number = 34,
    action: AnyAction,
)
    : number
{
    return state;
}
