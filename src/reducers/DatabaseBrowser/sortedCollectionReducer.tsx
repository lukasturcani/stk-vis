import { AnyAction } from '@reduxjs/toolkit';


export function sortedCollectionReducer(
    state: string = 'THIS IS THE DEFAULT REDUCER VALUE '+
                    'AND YOU SHOULD NEVER SEE IT',
    action: AnyAction,
)
    : string
{
    return state;
}
