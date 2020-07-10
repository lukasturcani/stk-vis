import {
    Db,
} from 'mongodb';
import {
    ICollectionData,
} from '../types';


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
    );
}
