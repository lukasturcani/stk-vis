import { Db } from 'mongodb';
import { IMoleculeDataQuery } from './getMoleculeDataQuery';
import { IPositionMatrixEntry } from '../types';
import {
    CollectionConnectionError,
} from '../errors';


export function getPositionMatrices(
    database: Db,
    query: IMoleculeDataQuery,
    collection: string,
)
    : Promise<IPositionMatrixEntry[]>
{
    return database
    .collection(collection)
    .find(query)
    .toArray()
    .catch(err => { throw new CollectionConnectionError(); });
}
