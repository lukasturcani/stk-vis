import {
    IMoleculeEntry,
    IPartialMolecule,
    IPartialMolecules,
} from '../../types';
import {
    getPartialMolecule,
} from '../../utilities';
import {
    isJust,
    getValue,
} from 'maybe';


interface Options
{
    numEntriesPerPage: number;
    moleculeKey: string;
}


export function getPartialMolecules(
    options: Options,
)
    : (molecules: IMoleculeEntry[]) => IPartialMolecules
{
    return (molecules: IMoleculeEntry[]) =>
    {
        const validated: IPartialMolecule[]
            = molecules
            .slice(0, options.numEntriesPerPage)
            .map(getPartialMolecule)
            .filter(isJust)
            .map(getValue);

        const result: IPartialMolecules
            = new Map();

        for (const molecule of validated)
        {
            result.set(
                molecule.keys.get(options.moleculeKey),
                molecule,
            );
        }
        return result;
    };
}
