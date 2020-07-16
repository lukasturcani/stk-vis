import {
    IPartialMolecule,
} from '../types/IPartialMolecule';
import {
    IValueEntries,
} from '../types/IValueEntries';


export function addValues(
    moleculeKey: string,
    molecules: Map<string, IPartialMolecule>,
)
    : (entries: IValueEntries) => void
{
    return (entries: IValueEntries) =>
    {
        for (const entry of entries.entries)
        {
            (molecules.get(entry[moleculeKey]) as IPartialMolecule)
            .propertyValues
            .set(entries.collection, entry.v.toString());
        }
    };
}

