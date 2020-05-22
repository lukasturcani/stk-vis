import { combineReducers, Action } from '@reduxjs/toolkit';
import { IMongoDbState } from './model';


export function mongoDbStateReducer(
    state: IMongoDbState,
    action: Action,
): IMongoDbState
{
    return state;
}
