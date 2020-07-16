import {
    IValueEntry,
} from '../types/IValueEntry';
import {
    ISortedEntry,
} from '../types/ISortedEntries';


export function getSortedEntry(
    moleculeKey: string,
)
    : (entry: IValueEntry) => ISortedEntry
{
    return (entry: IValueEntry) => {
        return {
            key: entry[moleculeKey],
            value: entry,
        };
    };
}
