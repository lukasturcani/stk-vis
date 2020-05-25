import { Maybe, Just, Nothing } from '../../../../utilities';
import { MongoClient, Cursor } from 'mongodb';
import { IMoleculeIds } from './IMoleculeIds';
import { IPropertyQuery } from './getPropertyQuery';
import { IDbEntry } from './IDbEntry';


export function assertNever(arg: never): never { throw Error(); }


interface getPropertyPromiseSignature
{
    (client: MongoClient):
    (database: string) =>
    (query: IPropertyQuery) =>
    (collectionName: string) =>
    Promise<any>
}

export const getPropertyPromise: getPropertyPromiseSignature =
    (client: MongoClient) =>
    (database: string) =>
    (query: IPropertyQuery) =>
    (collectionName: string) => {

        const collection
            = client
            .db(database)
            .collection(collectionName);

        const cursor: Cursor
            = collection.find(query);

        return cursor.toArray().then(result => {
            cursor.close();
            return result;
        });
    };




export function getMoleculeId(
    moleculeIds: IMoleculeIds,
    result: IDbEntry,
)
    : Maybe<number>
{
    for (let [propName, propValue] of Object.entries(result))
    {
        if (
            moleculeIds.hasOwnProperty(propName)
            &&
            moleculeIds[propName].hasOwnProperty(propValue)
        ){
            return new Just(moleculeIds[propName][propValue]);
        }
    }
    return new Nothing()
}
