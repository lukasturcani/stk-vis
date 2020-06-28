import { IDbEntry } from './IDbEntry';
import { IDatabaseData } from './IDatabaseData';


export function getDatabaseData(
    items: IDbEntry[],
    sortedCollection: string,
)
    : IDatabaseData
{
    const data: IDatabaseData
        = {
            columnValues: {[sortedCollection]: {}},
            moleculeIds: {},
            moleculeKeyNames: new Set(),
            molecules: [],
        };

    for (let moleculeId = 0; moleculeId < items.length; ++moleculeId)
    {
        addMoleculeData(
            data,
            sortedCollection,
            moleculeId,
            items[moleculeId],
        );
    }
    return data;
}


function addMoleculeData(
    data: IDatabaseData,
    sortedCollection: string,
    moleculeId: number,
    dbEntry: IDbEntry,
)
    : void
{
    const notKeyNames: Set<string>
        = new Set(['v', '_id']);

    const molecule: any
        = {};

    for (const [propName, propValue] of Object.entries(dbEntry))
    {
        if (notKeyNames.has(propName))
        {
            if (propName === '_id')
            {
                continue;
            }

            data.columnValues[sortedCollection][moleculeId]
                = propValue;
        }
        else
        {
            if (data.columnValues[propName] === undefined)
            {
                data.columnValues[propName] = {};
                data.moleculeIds[propName] = {};
            }
            if (
                data.moleculeIds[propName][propValue as string]
                ===
                undefined
            )
            {
                data.moleculeIds[propName][propValue as string] = [];
            }

            molecule[propName] = propValue;
            data.moleculeKeyNames.add(propName);
            data.columnValues[propName as string][moleculeId]
                = propValue as string;
            data.moleculeIds[propName][propValue as string].push(
                moleculeId
            );
        }
    }
    data.molecules.push(molecule);
}
