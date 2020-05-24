import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPropertyCollections,
} from '../../../../selectors';
import {
    IInitialDatabaseBrowser,
    IMolecule,
    IColumnValues,
    ILoadedDatabaseBrowser,
} from '../../../../models';
import { MongoClient, Cursor } from 'mongodb';
import {
    getMolecule,
    getPropertyQuery,
    getPropertyPromise,
    getMoleculeKeyNames,
    getMoleculeKeyValues
} from './utilities';
import { AnyAction } from '@reduxjs/toolkit'
import { updateTable } from '../../updateTable';


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

    MongoClient.connect(url, function(err, client) {
        const cursor: Cursor
            = client
            .db(database)
            .collection(moleculesCollection)
            .find({});

        cursor.toArray(function(err, items) {
            const molecules: IMolecule[]
                = items.map(getMolecule);

            const query: any
                = getPropertyQuery(molecules);

            const propertyPromises: Promise<any>[]
                = propertyCollections.map(
                    getPropertyPromise(client)(database)(query)
                )

            const columnValues: any
                = {};

            for (let keyName of getMoleculeKeyNames(molecules))
            {
                columnValues[keyName] = {};
                for (
                    let [moleculeId, keyValue]
                    of getMoleculeKeyValues(keyName, molecules)
                ){
                    columnValues[keyName][moleculeId]
                        = keyValue;
                }
            }

            Promise.all(propertyPromises).then(properties => {
            });

            dispatch(updateTable({ molecules, columnValues }));
        });

        cursor.close();
        client.close();
    });
}
