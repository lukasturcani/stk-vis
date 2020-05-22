import { combineReducers, Action } from '@reduxjs/toolkit';
import { IMongoDbState } from './model';


export const mongoDbStateReducer
    : (state: IMongoDbState, action: Action) => IMongoDbState
= (state: IMongoDbState, action: Action): IMongoDbState => {
    return state;
};
