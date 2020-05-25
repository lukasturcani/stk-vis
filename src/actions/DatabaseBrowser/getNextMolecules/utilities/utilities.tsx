import {
    IInitialDatabaseBrowser,
    IMolecule,
    IColumnValues,
    ILoadedDatabaseBrowser,
} from '../../../../models';
import { MongoClient, Cursor } from 'mongodb';


export function assertNever(arg: never): never { throw Error(); }


interface IMoleculeKeyValues
{
    [moleculeKeyName: string]: string[]
}


function* _getMoleculeKeyNames(
    notKeys: Set<string>,
    molecule: IMolecule,
)
    : Generator<string>
{
    for (let keyName of Object.getOwnPropertyNames(molecule))
    {
        if (!notKeys.has(keyName))
        {
            yield keyName;
        }
    }
}


export function* getMoleculeKeyNames(
    molecules: IMolecule[],
)
    : Generator<string>
{
    const moleculeKeyNames: Set<string>
        = new Set();

    const notKeys: Set<string>
        = new Set(['atoms', 'bonds', '_id']);

    for (let molecule of molecules)
    {
        for (
            let moleculeKeyName
            of _getMoleculeKeyNames(notKeys, molecule)
        ) {
            if (!moleculeKeyNames.has(moleculeKeyName))
            {
                moleculeKeyNames.add(moleculeKeyName);
                yield moleculeKeyName;
            }
        }
    }
}


export function* getMoleculeKeyValues(
    keyName: string,
    molecules: IMolecule[],
)
    : Generator<[number, string]>
{
    for (let i: number = 0; i < molecules.length; ++i)
    {
        if (molecules[i].hasOwnProperty(keyName))
        {
            yield [i, molecules[i][keyName]];
        }
    }
}



function getPropertySubquery(
    keyName: string,
    keyValues: string[],
)
    : any
{
    return {
        [keyName]: {
            '$in': keyValues,
        }
    };
}


export function getPropertyQuery(
    molecules: IMolecule[],
)
    : any
{
    const moleculeKeyNames: string[]
        = Array.from(getMoleculeKeyNames(molecules));

    const moleculeKeyValues: IMoleculeKeyValues
        = {}

    for (let keyName of moleculeKeyNames)
    {
        moleculeKeyValues[keyName]
            = Array.from(
                getMoleculeKeyValues(keyName, molecules),
                ([moleculeId, keyValue]) => keyValue,
            );
    }

    return {
        '$or': moleculeKeyNames.map(
            keyName => getPropertySubquery(
                keyName,
                moleculeKeyValues[keyName],
            )
        ),
    };
}


interface IgetPropertyPromise
{
    (client: any):
    (database: string) =>
    (query: any) =>
    (collectionName: string) =>
    Promise<any>
}

export const getPropertyPromise: IgetPropertyPromise =
    (client: any) =>
    (database: string) =>
    (query: any) =>
    (collectionName: string) => {

        const collection
            = client
            .db(database)
            .collection(collectionName);

        const cursor: Cursor
            = collection.find(query);

        return cursor.toArray().then(result => {
            cursor.close();
            return result;
        });
    };
