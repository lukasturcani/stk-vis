import {
    MongoClient,
    Db,
} from 'mongodb';
import {
    ICollectionData,
    IMoleculeEntry,
    IPartialMolecule,
} from '../../types';
import {
    getPartialMolecule,
} from '../../utilities';
import {
    IStageOneResult,
} from './IStageOneResult';
import {
    isJust,
    getValue,
} from '../../../utilities';


interface Options
{
    database: string;
    moleculeCollection: string;
    nonValueCollections: Set<string>;
    pageIndex: number;
    numEntriesPerPage: number;
}




export function stageOne(
    options: Options,
)
    : (client: MongoClient) => Promise<IStageOneResult>
{
    return (client: MongoClient) : Promise<IStageOneResult> =>
    {
        const database: Db
            = client.db(options.database);

        const valueCollections: Promise<string[]>
            = getValueCollections(options, database);

        const molecules: Promise<IPartialMolecule[]>
            = getMolecules(options, database)
            .then(validateMolecules(options.numEntriesPerPage))

        return Promise.all([
            Promise.resolve(client),
            valueCollections,
            molecules,
        ]);
    };
}


function getValueCollections
(
    options: Options,
    database: Db,
)
    : Promise<string[]>
{
    return database
    .listCollections(undefined, { nameOnly: true })
    .toArray()
    .then(
        (collections: ICollectionData[]) =>
        {
            return collections
            .map(collection => collection.name)
            .filter(
                name => !options.nonValueCollections.has(name)
            );
        }
    );
}


function getMolecules
(
    options: Options,
    database: Db,
)
    : Promise<IMoleculeEntry[]>
{
    return database
    .collection(options.moleculeCollection)
    .find({})
    .skip(options.pageIndex * options.numEntriesPerPage)
    // Add +1 to check if there is another entry on the
    // next page, which is used to determine if the current
    // page is the last page.
    .limit(options.numEntriesPerPage+1)
    .toArray();
}


function validateMolecules(
    numEntriesPerPage: number,
)
    : (molecules: IMoleculeEntry[]) => IPartialMolecule[]
{
    return (molecules: IMoleculeEntry[]) =>
    (
        molecules
        .slice(0, numEntriesPerPage)
        .map(getPartialMolecule)
        .filter(isJust)
        .map(getValue)
    );
}
