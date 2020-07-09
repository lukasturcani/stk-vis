import {
    IMoleculeEntry,
    IPartialMolecule,
    IMoleculeKeys,
} from '../types';
import { Maybe, Just } from 'maybe';


export function getPartialMolecule(
    entry: IMoleculeEntry,
)
    : Maybe<IPartialMolecule>
{
    return new Just({
        keys: getMoleculeKeys(entry),
        propertyValues: new Map(),
        atoms: entry.a.map(([atomicNumber]) => ({ atomicNumber })),
        bonds: entry.b.map(([atom1Id, atom2Id, order]) => (
            { atom1Id, atom2Id, order }
        )),
    });
}


function getMoleculeKeys(
    entry: IMoleculeEntry,
)
    : IMoleculeKeys
{
    const keys: IMoleculeKeys
        = new Map();

    for (const [key, value] of Object.entries(entry))
    {
        if (key !== 'a' && key !== 'b')
        {
            keys.set(key, value);
        }
    }

    return keys;
}
