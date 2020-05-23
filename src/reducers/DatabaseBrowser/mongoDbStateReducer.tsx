import { combineReducers, Action } from '@reduxjs/toolkit';
import { IMongoDbState } from '../../models';


const initialState: IMongoDbState = {
    url: 'mongodb://localhost:27017',
    database: 'stkVis',
    moleculeCollection: 'molecules',
    positionMatrixCollection: 'position_matrices',
};


export function mongoDbStateReducer(
    state: IMongoDbState,
    action: Action,
): IMongoDbState
{
    if (state === undefined) {
        return initialState;
    }
    return state;
}
