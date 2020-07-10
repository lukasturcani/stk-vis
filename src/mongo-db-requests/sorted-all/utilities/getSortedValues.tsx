import { Db } from 'mongodb';
import {
    IValueEntry,
    ISortedEntry,
    ISortedEntries,
} from '../../types';


interface Options
{
    sortedCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
}



export function getSortedValues(
    options: Options,
    database: Db,
)
    : Promise<ISortedEntries>
{
    return database
    .collection(options.sortedCollection)
    .aggregate([

    ])
    .skip(options.pageIndex * options.numEntriesPerPage)
    // Add +1 to check if there is another entry on the
    // next page, which is used to determine if the current
    // page is the last page.
    .limit(options.numEntriesPerPage+1)
    .toArray().then(
        (entries) => ({
            collection: options.sortedCollection,
            items: entries.map(getSortedEntry),
        })
    )
}


function getSortedEntry(
    entry: IValueEntry,
)
    : ISortedEntry
{
    return {
        key: 'one',
        value: entry,
    };
}
