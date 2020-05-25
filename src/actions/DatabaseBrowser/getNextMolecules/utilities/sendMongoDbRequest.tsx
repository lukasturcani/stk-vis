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
    getPropertyPromise,
    getMoleculeKeyNames,
    getMoleculeKeyValues,
} from './utilities';
import { AnyAction } from '@reduxjs/toolkit'
import { updateTable } from '../../updateTable';


function getMoleculeId(moleculeIds: IMoleculeIds, result: any): any
{
    for (let propName of Object.getOwnPropertyNames(result))
    {
        const propValue: any
            = result[propName];

        if (
            moleculeIds.hasOwnProperty(propName)
            &&
            moleculeIds[propName].hasOwnProperty(propValue)
        ){
            return moleculeIds[propName][propValue];
        }
    }
}


type Mutable<T> = {
    [K in keyof T]: Mutable<T[K]>;
}


interface IMoleculeIdValues
{
    [moleculeKeyValue: string]: number
}


interface IMoleculeIds
{
    [moleculeKeyName: string]: IMoleculeIdValues
}


interface IPropertySubquery
{
    [keyName: string]: { '$in': string[] }
}


interface IPropertyQuery
{
    '$or': IPropertySubquery[];
}


interface I
{
    columnValues: Mutable<IColumnValues>;
    moleculeIds: IMoleculeIds;
    moleculeKeyNames: Set<string>;
    molecules: IMolecule[];
}


function addMoleculeData(
    data: I,
    moleculeId: number,
    dbEntry: any
)
    : void
{
    const notKeyNames: Set<string>
        = new Set(['a', 'b', '_id']);

    const propNameMap: any
        = {
            a: 'atoms',
            b: 'bonds',
        };

    const molecule: any
        = {};

    for (let [propName, propValue] of Object.entries(dbEntry))
    {
        if (notKeyNames.has(propName))
        {
            if (propName === '_id')
            {
                continue;
            }
            let newPropName: string
                = propNameMap[propName];
            molecule[newPropName] = dbEntry[propName];
        }
        else
        {
            if (data.columnValues[propName] === undefined)
            {
                data.columnValues[propName] = {};
                data.moleculeIds[propName] = {};
            }
            molecule[propName] = dbEntry[propName];
            data.moleculeKeyNames.add(propName);
            data.columnValues[propName as string][moleculeId]
                = propValue as string;
            data.moleculeIds[propName][propValue as string]
                = moleculeId;
        }
    }
    data.molecules.push(molecule);
}


function f(items: any): I
{
    let data: I
        = {
            columnValues: {},
            moleculeIds: {},
            moleculeKeyNames: new Set(),
            molecules: [],
        };

    for (let moleculeId = 0; moleculeId < items.length; ++moleculeId)
    {
        addMoleculeData(data, moleculeId, items[moleculeId]);
    }
    return data;
}


function getPropertyQuery(data: I): IPropertyQuery
{
    const subqueries: IPropertySubquery[]
        = [];

    for (let moleculeKeyName of data.moleculeKeyNames)
    {
        let subquery: IPropertySubquery
            = {
                [moleculeKeyName]: {
                    '$in': Object.values(
                        data.columnValues[moleculeKeyName]
                    ),
                },
            };
        subqueries.push(subquery);
    }

    return {
        '$or': subqueries,
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
            const data: I
                = f(items);

            const query: any
                = getPropertyQuery(data);

            const propertyPromises: Promise<any>[]
                = propertyCollections.map(
                    getPropertyPromise(client)(database)(query)
                )

            Promise.all(propertyPromises).then(properties => {

                for (let i = 0; i < propertyCollections.length; ++i)
                {
                    const collectionName: string
                        = propertyCollections[i];

                    const propertyValues
                        = properties[i];

                    data.columnValues[collectionName] = {};

                    for (let value of propertyValues)
                    {
                        const moleculeId: number
                            = getMoleculeId(data.moleculeIds, value);

                        data.columnValues[collectionName][moleculeId]
                            = value['v'];
                    }

                }

                dispatch(updateTable({
                    molecules: data.molecules,
                    columnValues: data.columnValues
                }));
                cursor.close();
                client.close();
            });
        });
    });
}
