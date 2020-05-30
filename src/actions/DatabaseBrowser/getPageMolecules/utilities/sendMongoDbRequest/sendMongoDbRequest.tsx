import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getNumEntriesPerPage,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
} from '../../../../../models';
import { MongoClient } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import {
    onConnection,
    maybeGetPageData,
    IPageData,
} from './utilities';
import {
    Maybe,
} from '../../../../../utilities';


interface sendMongoDbRequestOptions
{
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser;
    pageIndex: number;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    dispatch: (arg: AnyAction) => void;
}

export function sendMongoDbRequest(
    options: sendMongoDbRequestOptions,
)
    : void
{
    const url: string
        = getMongoDbUrl(options.state);

    const database: string
        = getMongoDbDatabase(options.state);

    const moleculesCollection: string
        = getMongoDbMoleculeCollection(options.state);

    const positionMatrixCollection: string
        = getMongoDbPositionMatrixCollection(options.state);

    const numEntriesPerPage: number
        = getNumEntriesPerPage(options.state);

    const currentPageData: Maybe<IPageData>
        = maybeGetPageData(options.state);

    MongoClient.connect(url, onConnection({
        database,
        moleculesCollection,
        positionMatrixCollection,
        numEntriesPerPage,
        currentPageData,
        ...options
    }));
}
