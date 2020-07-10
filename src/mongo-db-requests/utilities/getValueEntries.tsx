import { ISortedEntries, IValueEntries } from '../types';



export function getValueEntries(
    sortedEntries: ISortedEntries,
)
    : IValueEntries
{
    return {
        collection: sortedEntries.collection,
        entries: sortedEntries.items.map(item => item.value)
    }
}
