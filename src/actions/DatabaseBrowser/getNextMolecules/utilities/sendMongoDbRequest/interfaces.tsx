import { AnyAction } from '@reduxjs/toolkit'
import { MongoClient, Cursor, MongoError } from 'mongodb';
import { IDbEntry } from '../IDbEntry';


export interface onConnectionOptions
{
    database: string;
    moleculesCollection: string;
    propertyCollections: string[];
    dispatch: (action: AnyAction) => void;
}


export interface onConnectionInterface
{
    (options: onConnectionOptions):
    (err: MongoError, client: MongoClient) => void
}


export interface processArrayOptions extends onConnectionOptions
{
    client: MongoClient,
    cursor: Cursor,
}

export interface processArrayInterface
{
    (options: processArrayOptions):
    (err: MongoError, items: IDbEntry[]) => void
}
