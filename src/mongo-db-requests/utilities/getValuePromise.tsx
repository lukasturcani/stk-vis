import { Db } from 'mongodb';
import { IMoleculeDataQuery } from './getMoleculeDataQuery';
import { IValueEntry, IValueEntries } from '../types';


export function getValuePromise(
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
        .then(
            (entries: IValueEntry[]) => ({
                collection,
                entries,
            })
        )
    );
}
