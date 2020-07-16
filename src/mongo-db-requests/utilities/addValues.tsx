import {
    IPartialMolecule,
    IPartialMolecules,
    IValueEntries,
} from '../types';


export function addValues(
    moleculeKey: string,
    molecules: IPartialMolecules,
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

