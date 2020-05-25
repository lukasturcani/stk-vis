import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPropertyCollections,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
} from '../../../../../models';
import { MongoClient } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import { onConnection } from './onConnection';


export function sendMongoDbRequest(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
    dispatch: (arg: AnyAction) => void,
)
    : void
{
    const url: string
        = getMongoDbUrl(state);

    const database: string
        = getMongoDbDatabase(state);

    const moleculesCollection: string
        = getMongoDbMoleculeCollection(state);

    const propertyCollections: string[]
        = getMongoDbPropertyCollections(state);

    MongoClient.connect(url, onConnection({
        database,
        moleculesCollection,
        propertyCollections,
        dispatch,
    }));
}
