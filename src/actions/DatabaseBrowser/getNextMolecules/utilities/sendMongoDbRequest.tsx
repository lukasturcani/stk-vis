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


function getMoleculeId(columnValues: any, result: any): any
{
    for (let propName of Object.getOwnPropertyNames(result))
    {
        const propValue: any
            = result[propName];

        if (
            columnValues.hasOwnProperty(propName)
            &&
            columnValues[propName].hasOwnProperty(propValue)
        ){
            return columnValues[propName][propValue];
        }
    }
}


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

            const reversedColumnValues: any
                = {};

            for (
                let keyName of Object.getOwnPropertyNames(columnValues)
            ){
                reversedColumnValues[keyName] = {};
                for (
                    let [moleculeId, moleculeKey]
                    of Object.entries(columnValues[keyName])
                ) {
                    reversedColumnValues[keyName][moleculeKey as string] = moleculeId;
                }
            }

            Promise.all(propertyPromises).then(properties => {

                for (let i = 0; i < propertyCollections.length; ++i)
                {
                    const collectionName: string
                        = propertyCollections[i];

                    const propertyValues
                        = properties[i];

                    columnValues[collectionName] = {};

                    for (let value of propertyValues)
                    {
                        const moleculeId: number
                            = getMoleculeId(
                                reversedColumnValues,
                                value,
                            );

                        columnValues[collectionName][moleculeId]
                            = value['v'];
                    }

                }

                dispatch(updateTable({ molecules, columnValues }));
                cursor.close();
                client.close();
            });
        });
    });
}
