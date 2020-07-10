import { ISortedEntries, IValueEntries } from '../types';



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
