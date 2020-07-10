import { Db } from 'mongodb';
import {
    ISortedEntries,
    SortType,
} from '../../types';
import {
    getSortedEntry,
} from '../../utilities';
import {
    RequestError,
    CollectionConnectionError,
} from '../../errors';


interface Options
{
    constructedMoleculeCollection: string;
    sortedCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
    sortType: SortType;
    moleculeKey: string;
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
        {
            '$match': {
                [options.moleculeKey]: {
                    '$exists': true,
                },
            },
        },
        {
            '$lookup': {
                'from': options.constructedMoleculeCollection,
                'localField': options.moleculeKey,
                'foreignField': options.moleculeKey,
                'as': 'constructedMolecule',
            },
        },
        {
            '$match': {
                '$expr': {
                    '$gt': [
                        {'$size': '$constructedMolecule'},
                        0,
                    ],
                },
            },
        },
        {
            '$sort': {
                'v': (options.sortType === SortType.Ascending)? 1 : -1,
            }
        },
    ])
    .skip(options.pageIndex * options.numEntriesPerPage)
    // Add +1 to check if there is another entry on the
    // next page, which is used to determine if the current
    // page is the last page.
    .limit(options.numEntriesPerPage+1)
    .toArray()
    .catch((err) =>
    {
        if (err instanceof RequestError)
        {
            throw err;
        }
        throw new CollectionConnectionError(
            'Could not connect to the '
            + options.sortedCollection + ' collection.'
        );
    })
    .then(
        (entries) => ({
            collection: options.sortedCollection,
            items: entries.map(getSortedEntry(options.moleculeKey)),
        })
    )
}


