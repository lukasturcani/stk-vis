import { IPartialMolecules, IValueEntries } from '../types';


export function addValues(
    moleculeKey: string,
    molecules: IPartialMolecules,
)
    : (promise: Promise<IValueEntries>) => Promise<void>
{
    return (promise: Promise<IValueEntries>) => promise.then(
        (entries: IValueEntries) => {
            for (const entry of entries.entries)
            {
                molecules
                .get(entry[moleculeKey])
                .propertyValues
                .set(entries.collection, entry.v.toString());
            }
        }
    );
}

