import { AnyAction } from '@reduxjs/toolkit';


export function numEntriesPerPageReducer(
    state: number = 80,
    action: AnyAction,
)
    : number
{
    return state;
}
