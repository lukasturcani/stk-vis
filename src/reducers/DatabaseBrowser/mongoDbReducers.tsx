import { AnyAction } from '@reduxjs/toolkit';


export function urlReducer(
    state: string = 'mongodb://localhost:27017',
    action: AnyAction,
)
    : string
{
    return state;
}


export function databaseReducer(
    state: string = 'stkVis',
    action: AnyAction,
)
    : string
{
    return state;
}


export function moleculeCollectionReducer(
    state: string = 'molecules',
    action: AnyAction,
)
    : string
{
    return state;
}


export function positionMatrixCollectionReducer(
    state: string = 'position_matrices',
    action: AnyAction,
)
    : string
{
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
