import { IMoleculeEntry, IAtomEntry, IBondEntry } from './IDbEntries';
import {
    IDatabaseMolecule,
    IDatabaseData,
} from './IDatabaseData';
import {
    Maybe,
    MaybeKind,
    Just,
    Nothing,
} from '../../../../../../../../../../utilities';
import {
    IMoleculeKeys,
    IAtom,
    IBond,
} from '../../../../../../../../../../models';


export function getDatabaseData(
    items: IMoleculeEntry[],
)
    : IDatabaseData
{
    const data: IDatabaseData
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


function addMoleculeData(
    data: IDatabaseData,
    moleculeId: number,
    dbEntry: IMoleculeEntry,
)
    : void
{
    const molecule: Maybe<IDatabaseMolecule>
        = toIDatabaseMolecule(dbEntry);

    switch (molecule.kind)
    {
        case MaybeKind.Nothing:
        {
            // Send a snackbar warning / error here.
            break;
        }

        case MaybeKind.Just:
        {
            addKeys(data, moleculeId, molecule.value.keys);
            data.molecules.push(molecule.value);
            break;
        }

        default:
        {
            assertNever(molecule);
        }
    }

}



function toIDatabaseMolecule(
    dbEntry: IMoleculeEntry,
)
    : Maybe<IDatabaseMolecule>
{
    const notKeyNames: Set<string>
        = new Set(['a', 'b', '_id', 'constructedMolecule']);

    if (dbEntry.a === undefined)
    {
        return new Nothing();
    }
    if (dbEntry.b === undefined)
    {
        return new Nothing();
    }

    const keys: IMoleculeKeys
        = {};

    for (const [propName, propValue] of Object.entries(dbEntry))
    {
        if (!notKeyNames.has(propName))
        {
            keys[propName] = propValue;
        }
    }

    return new Just({
        atoms: dbEntry.a.map(toIAtom),
        bonds: dbEntry.b.map(toIBond),
        keys,
    });
}


function addKeys(
    data: IDatabaseData,
    moleculeId: number,
    keys: IMoleculeKeys,
)
    : void
{
    for (const [key, value] of Object.entries(keys))
    {
        if (data.columnValues[key] === undefined)
        {
            data.columnValues[key] = {};
            data.moleculeIds[key] = {};
        }
        if (
            data.moleculeIds[key][value]
            ===
            undefined
        )
        {
            data.moleculeIds[key][value] = [];
        }

        data.moleculeKeyNames.add(key);
        data.columnValues[key][moleculeId]
            = value
        data.moleculeIds[key][value].push(moleculeId);
    }
}


function toIAtom(
    entry: IAtomEntry,
)
    : IAtom
{
    return {
        atomicNumber: entry[0],
    };
}


function toIBond(
    entry: IBondEntry,
)
    : IBond
{
    return {
        atom1Id: entry[0],
        atom2Id: entry[1],
        order: entry[2],
    };
}


function assertNever(arg: never): never { throw Error(); }
