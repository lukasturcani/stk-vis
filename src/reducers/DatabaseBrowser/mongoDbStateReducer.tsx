import { combineReducers, Action } from '@reduxjs/toolkit';
import { IMongoDbState } from '../../models';


export function mongoDbStateReducer(
    state: IMongoDbState,
    action: Action,
): IMongoDbState
{
    return state;
}
