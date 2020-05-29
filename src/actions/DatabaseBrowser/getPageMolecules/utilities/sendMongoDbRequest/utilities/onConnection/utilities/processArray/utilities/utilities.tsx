import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from '../../../../utilities';
import { MongoError, MongoClient, Cursor } from 'mongodb';
import { IMoleculeIds } from './IMoleculeIds';
import { IPropertyQuery } from './getPropertyQuery';
import { IDbEntry } from './IDbEntry';
import { IDatabaseData } from './getDatabaseData';
import { AnyAction } from '@reduxjs/toolkit';
import {
    setMoleculeRequestState,
} from '../../../../actions';
import {
    MoleculeRequestStateKind,
} from '../../../../models';


export function assertNever(arg: never): never { throw Error(); }


export interface IPropertyResults
{
    collectionName: string;
    propertyValues: IDbEntry[];
}


interface getPropertyPromiseOptions
{
    client: MongoClient;
    database: string;
    query: IPropertyQuery;
    dispatch: (action: AnyAction) => void;
    errorSnackbar: (message: string) => void;
}


export function getPropertyPromise(
    options: getPropertyPromiseOptions,
)
    : (collectionName: string) => Promise<Maybe<IPropertyResults>>
{
    return (collectionName: string) => {
        const collection
            = options.client
            .db(options.database)
            .collection(collectionName);

        const cursor: Cursor
            = collection.find(options.query);

        return cursor.toArray()
            .then(
                (result: IDbEntry[]) =>
                {
                    cursor.close();
                    return new Just({
                        collectionName: collectionName,
                        propertyValues: result,
                    });
                }
            )
            .catch(handleFailedPropertyRequest(options))
    };
}




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



export function extractPropertyData(
    data: IDatabaseData,
)
    : (r: Maybe<IPropertyResults>) => Maybe<IPropertyResults>
{
    return (propertyResults: Maybe<IPropertyResults>) => {
        switch (propertyResults.kind)
        {
            case MaybeKind.Nothing:
                break;

            case MaybeKind.Just:
                data.columnValues[propertyResults.value.collectionName]
                    = {};

                for (let value of propertyResults.value.propertyValues)
                {
                    const moleculeId: Maybe<number>
                        = getMoleculeId(data.moleculeIds, value);

                    switch(moleculeId.kind)
                    {
                        case MaybeKind.Just:
                            data.columnValues
                            [propertyResults.value.collectionName]
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

                break;

            default:
                assertNever(propertyResults)
                break;

        }
        return propertyResults;
    };
}



interface handleFailedPropertyRequestOptions
{
    dispatch: (action: AnyAction) => void;
    errorSnackbar: (message: string) => void;
}

export function handleFailedPropertyRequest(
    options: handleFailedPropertyRequestOptions,
)
    : (err: MongoError) => Nothing
{
    return (err: MongoError) =>{
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestFailed
            )
        );
        options.errorSnackbar('Could not find collection.');
        return new Nothing();
    };
}
