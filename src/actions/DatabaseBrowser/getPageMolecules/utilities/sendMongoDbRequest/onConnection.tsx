import { MongoClient, Cursor, MongoError } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import { processArray } from './processArray';
import {
    onConnectionInterface,
    onConnectionOptions,
} from './interfaces';


export const onConnection: onConnectionInterface =
    (options: onConnectionOptions) =>
    (err: MongoError, client: MongoClient) =>
{
    const cursor: Cursor
        = client
        .db(options.database)
        .collection(options.moleculesCollection)
        .find({});

    cursor.toArray(processArray({ ...options, cursor, client }));

}
