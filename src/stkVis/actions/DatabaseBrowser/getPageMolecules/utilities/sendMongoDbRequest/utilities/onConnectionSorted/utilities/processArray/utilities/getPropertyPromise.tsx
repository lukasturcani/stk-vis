import { MongoError, MongoClient, Cursor } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit';
import { IPropertyQuery } from './IPropertyQuery';
import {
    Maybe,
    Nothing,
    Just,
} from '../../../../../../../../../../utilities';
import {
    MoleculeRequestStateKind,
} from '../../../../../../../../../../models';
import {
    setMoleculeRequestState,
} from '../../../../../../../../../../actions';
import { IPropertyResults } from './IPropertyResults';
import { IDbEntry } from './IDbEntry';


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
    return (
        collectionName: string,
    )
    : Promise<Maybe<IPropertyResults>> =>
    {
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
    return (err: MongoError): Nothing =>{
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestFailed
            )
        );
        options.errorSnackbar('Could not find collection.');
        return new Nothing();
    };
}
