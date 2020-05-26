import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from '../../../../utilities';
import { MongoClient, Cursor } from 'mongodb';
import { IMoleculeIds } from './IMoleculeIds';
import { IPropertyQuery } from './getPropertyQuery';
import { IDbEntry } from './IDbEntry';
import { IDatabaseData } from './getDatabaseData';


export function assertNever(arg: never): never { throw Error(); }


export interface IPropertyResults
{
    collectionName: string;
    propertyValues: IDbEntry[];
}


interface getPropertyPromiseSignature
{
    (client: MongoClient):
    (database: string) =>
    (query: IPropertyQuery) =>
    (collectionName: string) =>
    Promise<IPropertyResults>
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

        return cursor.toArray().then(
            (result: IDbEntry[]) =>
            {
                cursor.close();
                return {
                    collectionName: collectionName,
                    propertyValues: result,
                };
            }
        );
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


interface extractPropertyDataSignature
{
    (data: IDatabaseData):
    (propertyResults: IPropertyResults) =>
    IPropertyResults
}


export const extractPropertyData: extractPropertyDataSignature =
    (data: IDatabaseData) =>
    (propertyResults: IPropertyResults) =>
{
    data.columnValues[propertyResults.collectionName] = {};

    for (let value of propertyResults.propertyValues)
    {
        const moleculeId: Maybe<number>
            = getMoleculeId(data.moleculeIds, value);

        switch(moleculeId.kind)
        {
            case MaybeKind.Just:
                data.columnValues
                [propertyResults.collectionName]
                [moleculeId.value]
                    = value['v'];
                break;

            case MaybeKind.Nothing:

                throw Error(
                    'No molecule id was found. This ' +
                    'should never happen.'
                );
                break;

            default:
                assertNever(moleculeId);

        }
    }
    return propertyResults;
};
