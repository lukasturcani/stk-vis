import { Db } from 'mongodb';
import { IMoleculeDataQuery } from '../types/IMoleculeDataQuery';
import { IPositionMatrixEntry } from '../types/IPositionMatrixEntry';
import {
    RequestError,
    CollectionConnectionError,
} from '../errors';


export function getPositionMatrixEntries(
    moleculeKey: string,
    database: Db,
    query: IMoleculeDataQuery,
    collection: string,
)
    : Promise<IPositionMatrixEntry[]>
{
    return database
    .collection(collection)
    .find(query)
    .toArray()
    .catch(err =>
    {
        if (err instanceof RequestError)
        {
            throw err;
        }
        throw new CollectionConnectionError(
            'Could not connect to the ' + collection + ' collection.'
        );
    })
    .then( (items: unknown[]) => {
        const validated: IPositionMatrixEntry[]
            = [];

        for (const item of items)
        {
            if (
                item['m'] !== undefined
                &&
                item[moleculeKey] !== undefined
            ) {
                validated.push({
                    m: item['m'],
                    key: item[moleculeKey],
                });
            }
        }
        return validated;
    });
}
