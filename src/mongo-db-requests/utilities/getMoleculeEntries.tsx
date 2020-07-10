import { Db } from 'mongodb';
import { IMoleculeEntry } from '../../types';
import { IMoleculeDataQuery } from '../../utilities';
import { CollectionConnectionError } from '../../errors';


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
    .catch( () => { throw new CollectionConnectionError(); } );
}
