import { AnyAction } from '@reduxjs/toolkit';


export function entriesPerPageReducer(
    state: number = 20,
    action: AnyAction,
)
    : number
{
    return state;
}
