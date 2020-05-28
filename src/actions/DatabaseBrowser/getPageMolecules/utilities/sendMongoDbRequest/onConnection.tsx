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
        .find({})
        .skip(
            options.pageIndex
            *
            options.numEntriesPerPage
        )
        // Add +1 to check if there is another entry on the next page,
        // which is used to determine if the current page is the last
        // page.
        .limit(options.numEntriesPerPage+1);

    cursor.toArray(processArray({ ...options, cursor, client }));

}
