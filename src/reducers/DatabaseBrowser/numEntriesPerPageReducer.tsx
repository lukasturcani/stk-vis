import { AnyAction } from '@reduxjs/toolkit';


export function numEntriesPerPageReducer(
    state: number = 20,
    action: AnyAction,
)
    : number
{
    return state;
}
