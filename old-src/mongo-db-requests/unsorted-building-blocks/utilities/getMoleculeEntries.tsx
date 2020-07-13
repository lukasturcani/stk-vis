import {
    Db,
} from 'mongodb';
import {
    IMoleculeEntry
} from '../../types';
import {
    RequestError,
    CollectionConnectionError,
} from '../../errors';


interface Options
{
    moleculeKey: string;
    moleculeCollection: string;
    pageIndex: number;
    numEntriesPerPage: number;
    constructedMoleculeCollection: string;
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
                    '$eq': [
                        {'$size': '$constructedMolecule'},
                        0,
                    ],
                },
            },
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
            + options.moleculeCollection + ' collection.'
        );
    });
}
