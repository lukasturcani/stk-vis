import {
    Db,
} from 'mongodb';
import {
    ICollectionData,
} from '../types';
import {
    RequestError,
    DatabaseConnectionError,
} from '../errors';


export function getValueCollections
(
    ignoreCollections: Set<string>,
    database: Db,
)
    : Promise<string[]>
{
    return database
    .listCollections(undefined, { nameOnly: true })
    .toArray()
    .then(
        (collections: ICollectionData[]) =>
        {
            return collections
            .map(collection => collection.name)
            .filter(name => !ignoreCollections.has(name));
        }
    )
    .catch(err =>
    {
        if (err instanceof RequestError)
        {
            throw err;
        }
        throw new DatabaseConnectionError(
            'Getting the list of collections failed.',
        );
    });
}
