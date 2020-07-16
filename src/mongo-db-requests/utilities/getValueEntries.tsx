import { Db } from 'mongodb';
import { IMoleculeDataQuery } from '../types/IMoleculeDataQuery';
import { IValueEntry } from '../types/IValueEntry';
import { IValueEntries } from '../types/IValueEntries';
import { RequestError, CollectionConnectionError } from '../errors';


export function getValueEntries(
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
        .catch(err  =>
        {
            if ( err instanceof RequestError)
            {
                throw err;
            }
            throw new CollectionConnectionError(
                'Could not connect to the '
                + collection + ' collection.'
            );
        })
        .then(
            (entries: IValueEntry[]) => ({
                collection,
                entries,
            })
        )
    );
}
