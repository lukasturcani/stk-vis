import {
    Db,
} from 'mongodb';
import {
    IPartialMolecule,
    fromUnknown,
} from 'mongo-db-requests/types/IPartialMolecule';
import {
    RequestError,
    CollectionConnectionError,
} from '../../errors';
import { isJust, getValue } from 'maybe';


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
    : Promise<Map<string, IPartialMolecule>>
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
    .then((items: unknown[]) => {
        const validated: IPartialMolecule[]
            = items
            .slice(0, options.numEntriesPerPage)
            .map(fromUnknown(options.moleculeKey))
            .filter(isJust)
            .map(getValue)

        const result: Map<string, IPartialMolecule>
            = new Map();

        for (const molecule of validated)
        {
            result.set(molecule.key, molecule);
        }

        return result;
    });
}
