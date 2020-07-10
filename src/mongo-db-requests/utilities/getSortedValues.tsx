import { Db } from 'mongodb';
import { ISortedEntries } from '../types';


export function getSortedValues(
    database: Db,
    collection: string,
)
    : Promise<ISortedEntries>
{
    return Promise.resolve({
        collection,
        items: []
    });
}
