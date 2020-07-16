import { Db } from 'mongodb';
import { IMoleculeDataQuery } from './getMoleculeDataQuery';
import { IPositionMatrixEntry } from '../types';
import {
    RequestError,
    CollectionConnectionError,
} from '../errors';


export function getPositionMatrixEntries(
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
    .catch(err =>
    {
        if (err instanceof RequestError)
        {
            throw err;
        }
        throw new CollectionConnectionError(
            'Could not connect to the ' + collection + ' collection.'
        );
    });
}
