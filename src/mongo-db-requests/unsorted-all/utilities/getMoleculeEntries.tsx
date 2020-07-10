import {
    Db,
} from 'mongodb';
import {
    IMoleculeEntry
} from '../../types';


interface Options
{
    moleculeKey: string;
    moleculeCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
}


export function getMoleculeEntries
(
    options: Options,
    database: Db,
)
    : Promise<IMoleculeEntry[]>
{
    return database
    .collection(options.moleculeCollection)
    .find({
        [options.moleculeKey]: { $exists: true },
    })
    .skip(options.pageIndex * options.numEntriesPerPage)
    // Add +1 to check if there is another entry on the
    // next page, which is used to determine if the current
    // page is the last page.
    .limit(options.numEntriesPerPage+1)
    .toArray();
}
