import { Db } from 'mongodb';
import {
    IPartialMolecule,
    fromUnknown,
} from '../types/IPartialMolecule';
import { IMoleculeDataQuery } from '../types/IMoleculeDataQuery';
import { RequestError, CollectionConnectionError } from '../errors';
import { isJust, getValue } from 'maybe';


export interface Options
{
    moleculeCollection: string;
}


export function getMoleculeEntries(
    options: Options,
    database: Db,
    query: IMoleculeDataQuery,
)
    : Promise<IPartialMolecule[]>
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
    })
    .then( (items: unknown[]) =>
        items
        .map(fromUnknown)
        .filter(isJust)
        .map(getValue)
    );
}
