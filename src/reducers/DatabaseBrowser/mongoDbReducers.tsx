import { AnyAction } from '@reduxjs/toolkit';
import {
    updateMongoDbUrl,
    updateMongoDbDatabase,
    updateMongoDbMoleculeCollection,
    updateMongoDbPositionMatrixCollection,
    updateMongoDbFields,
    updateTable,
} from '../../actions';
import {
    IMoleculeSelectionType,
    MoleculeSelectionTypeKind,
} from '../../models';


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
    if (updateMongoDbFields.match(action))
    {
        return action.payload.url;
    }
    return state;
}


export function moleculeKeyReducer(
    state: string = 'InChIKey',
    action: AnyAction,
)
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.moleculeKey;
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
    if (updateMongoDbFields.match(action))
    {
        return action.payload.database;
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
    if (updateMongoDbFields.match(action))
    {
        return action.payload.moleculeCollection;
    }
    return state;
}


export function constructedMoleculeCollectionReducer(
    state: string = 'constructed_molecules',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.constructedMoleculeCollection;
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
    if (updateMongoDbFields.match(action))
    {
        return action.payload.positionMatrixCollection;
    }
    return state;
}


export function buildingBlockPositionMatrixCollectionReducer(
    state: string = 'building_block_position_matrices',
    action: AnyAction,
)
    : string
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.buildingBlockPositionMatrixCollection;
    }
    return state;
}


export function propertyCollectionsReducer(
    state: string[] = ['numAtoms'],
    action: AnyAction,
)
    : string[]
{
    if (updateTable.match(action))
    {
        return action.payload.propertyCollections;
    }
    return state;
}


export function moleculeSelectionTypeReducer(
    state: IMoleculeSelectionType = {
        kind: MoleculeSelectionTypeKind.Both,
    },
    action: AnyAction,
)
    : IMoleculeSelectionType
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.moleculeSelectionType;
    }
    return state;
}
