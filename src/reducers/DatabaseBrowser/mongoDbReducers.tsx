import { AnyAction } from '@reduxjs/toolkit';
import {
    updateMongoDbUrl,
    updateMongoDbDatabase,
    updateMongoDbMoleculeCollection,
    updateMongoDbPositionMatrixCollection,
} from '../../actions';


export function urlReducer(
    state: string = 'mongodb://localhost:27017',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbUrl.match(action))
    {
        return action.payload;
    }
    return state;
}


export function databaseReducer(
    state: string = 'stkVis',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbDatabase.match(action))
    {
        return action.payload;
    }
    return state;
}


export function moleculeCollectionReducer(
    state: string = 'molecules',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbMoleculeCollection.match(action))
    {
        return action.payload;
    }
    return state;
}


export function positionMatrixCollectionReducer(
    state: string = 'position_matrices',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbPositionMatrixCollection.match(action))
    {
        return action.payload;
    }
    return state;
}


export function propertyCollectionsReducer(
    state: string[] = ['numAtoms'],
    action: AnyAction,
)
    : string[]
{
    return state;
}
