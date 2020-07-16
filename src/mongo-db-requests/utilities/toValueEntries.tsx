import { IValueEntries } from '../types/IValueEntries';
import { ISortedEntries } from '../types/ISortedEntries';



export function toValueEntries(
    sortedEntries: ISortedEntries,
)
    : IValueEntries
{
    return {
        collection: sortedEntries.collection,
        entries: sortedEntries.items.map(item => item.value)
    }
}
