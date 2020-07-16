import { Db } from 'mongodb';
import {
    IPartialMolecule,
    fromAny,
} from '../types/IPartialMolecule';
import { IMoleculeDataQuery } from '../types/IMoleculeDataQuery';
import { RequestError, CollectionConnectionError } from '../errors';
import { isJust, getValue } from 'maybe';


export interface Options
{
    moleculeCollection: string;
    moleculeKey: string;
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
    .then( (items: any[]) =>
        items
        .map(fromAny(options.moleculeKey))
        .filter(isJust)
        .map(getValue)
    );
}
