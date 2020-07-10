import { Db } from 'mongodb';
import { IMoleculeDataQuery } from './getMoleculeDataQuery';
import { IValueEntry, IValueEntries } from '../types';
import { CollectionConnectionError } from '../errors';


export function getValues(
    database: Db,
    query: IMoleculeDataQuery,
)
    : (collection: string) => Promise<IValueEntries>
{
    return (collection: string) => (
        database
        .collection(collection)
        .find(query)
        .toArray()
        .catch( ()  => { throw new CollectionConnectionError(); } )
        .then(
            (entries: IValueEntry[]) => ({
                collection,
                entries,
            })
        )
    );
}
