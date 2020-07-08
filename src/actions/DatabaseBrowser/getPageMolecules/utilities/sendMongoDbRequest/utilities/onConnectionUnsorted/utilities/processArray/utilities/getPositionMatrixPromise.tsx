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
import { IPositionMatrixResults } from './IPositionMatrixResults';
import { IPositionMatrixEntry } from './IDbEntries';


interface getPositionMatrixPromiseOptions
{
    client: MongoClient;
    database: string;
    query: IPropertyQuery;
    dispatch: (action: AnyAction) => void;
    errorSnackbar: (message: string) => void;
}


export function getPositionMatrixPromise(
    options: getPositionMatrixPromiseOptions,
)
    : (collectionName: string) => Promise<Maybe<IPositionMatrixResults>>
{
    return (
        collectionName: string,
    )
    : Promise<Maybe<IPositionMatrixResults>> =>
    {
        const collection
            = options.client
            .db(options.database)
            .collection(collectionName);

        const cursor: Cursor
            = collection.find(options.query);

        return cursor.toArray()
            .then(
                (result: IPositionMatrixEntry[]) =>
                {
                    cursor.close();
                    return new Just({
                        collectionName: collectionName,
                        matrixValues: result,
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

function handleFailedPropertyRequest(
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
