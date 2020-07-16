import { Db } from 'mongodb';
import { IMoleculeEntry } from '../types';
import { IMoleculeDataQuery } from './getMoleculeDataQuery';
import { RequestError, CollectionConnectionError } from '../errors';


export interface Options
{
    moleculeCollection: string;
}


export function getMoleculeEntries(
    options: Options,
    database: Db,
    query: IMoleculeDataQuery,
)
    : Promise<IMoleculeEntry[]>
{
    return database
    .collection(options.moleculeCollection)
    .find(query)
    .toArray()
    .catch((err) =>
    {
        if (err instanceof RequestError)
        {
            throw err;
        }
        throw new CollectionConnectionError(
            'Could not connect to the '
            + options.moleculeCollection + ' collection.'
        );
    });
}
