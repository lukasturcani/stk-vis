import { Maybe, Just, Nothing } from 'maybe';
import { IPartialMolecule } from './IPartialMolecule';
import { IAtom } from './IAtom';
import { IBond } from './IBond';


export function fromUnknown(
    moleculeKey: string
)
    : (arg: unknown) => Maybe<IPartialMolecule>
{
    return (arg: unknown) => {

        const key: string | undefined
            = arg[moleculeKey];

        if (key === undefined)
        {
            return new Nothing();
        }

        const keys: Map<string, string>
            = getMoleculeKeys(arg);

        const atoms: IAtom[] | undefined
            = getAtoms(arg);

        if (atoms === undefined)
        {
            return new Nothing();
        }

        const bonds: IBond[] | undefined
            = getBonds(atoms, arg);

        if (bonds === undefined)
        {
            return new Nothing()
        }

        return new Just({
            key,
            keys,
            propertyValues: new Map(),
            atoms,
            bonds,
        });
    };
}


function getMoleculeKeys(
    entry: unknown,
)
    : Map<string, string>
{
    const keys: Map<string, string>
        = new Map();

    for (const [key, value] of Object.entries(entry))
    {
        if (key !== 'a' && key !== 'b')
        {
            keys.set(key, value.toString());
        }
    }

    return keys;
}


function getAtoms(
    entry: unknown,
)
    : IAtom[] | undefined
{
    const atomEntries: unknown
        = entry['a'];

    if (!Array.isArray(atomEntries))
    {
        return;
    }

    for (const atomEntry of atomEntries)
    {
        if (!Array.isArray(atomEntry))
        {
            return;
        }
        if (typeof atomEntry[0] !== 'number')
        {
            return;
        }
    }

    return atomEntries;
}


function getBonds(
    atoms: IAtom[],
    entry: unknown,
)
    : IBond[] | undefined
{
    const bondEntries: unknown
        = entry['b'];

    if (!Array.isArray(bondEntries))
    {
        return;
    }

    for (const bondEntry of bondEntries)
    {
        if (!Array.isArray(bondEntry))
        {
            return;
        }

        if (
            typeof bondEntry[0] !== 'number'
            ||
            typeof bondEntry[1] !== 'number'
            ||
            typeof bondEntry[2] !== 'number'
        ) {
            return;
        }

        if (atoms[bondEntry[0]] === undefined)
        {
            return;
        }
        if (atoms[bondEntry[1]] === undefined)
        {
            return;
        }
    }

    return bondEntries;
}
