import {
    IValueEntry,
    ISortedEntry,
} from '../types';


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
