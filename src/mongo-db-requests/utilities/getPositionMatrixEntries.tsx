import { Db } from 'mongodb';
import { IMoleculeDataQuery } from '../types/IMoleculeDataQuery';
import { IPositionMatrixEntry } from '../types/IPositionMatrixEntry';
import { IJson, IJsonValue } from 'mongo-db-requests/types/IJson';
import {
    IPositionMatrix,
} from 'mongo-db-requests/types/IPositionMatrix';
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
    .then( (items: IJson[]) => {
        const validated: IPositionMatrixEntry[]
            = [];

        for (const item of items)
        {
            const key: IJsonValue
                = item[moleculeKey];

            const m: IPositionMatrix | undefined
                = getPositionMatrix(item['m']);

            if (
                m !== undefined
                &&
                typeof key === 'string'
            ) {
                validated.push({ m, key });
            }
        }
        return validated;
    });
}


function getPositionMatrix(
    m: IJsonValue,
)
    : IPositionMatrix | undefined
{
    if (!Array.isArray(m))
    {
        return;
    }
    return m as unknown as IPositionMatrix;

}
