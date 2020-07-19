import {
    Db,
} from 'mongodb';
import {
    IPartialMolecule,
    fromAny,
} from 'mongo-db-requests/types/IPartialMolecule';
import {
    RequestError,
    CollectionConnectionError,
} from '../../errors';
import { isJust, getValue } from 'maybe';
import { IJson } from 'mongo-db-requests/types/IJson';


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
    : Promise<IPartialMolecule[]>
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
    })
    .then((items: IJson[]) =>
            items
            .map(fromAny(options.moleculeKey))
            .filter(isJust)
            .map(getValue)
    );
}
