import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getNumEntriesPerPage,
    getDatabaseBrowserKind,
    getSortedKind,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SortedKind,
} from '../../../../../models';
import { MongoClient } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import {
    onConnectionUnsorted,
    onConnectionSorted,
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

    switch (options.state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return MongoClient.connect(url, onConnectionUnsorted({
                database,
                moleculesCollection,
                positionMatrixCollection,
                numEntriesPerPage,
                currentPageData,
                ...options
            }));

        case DatabaseBrowserKind.Loaded:
            switch (options.state.sortedKind)
            {
                case SortedKind.Unsorted:
                    return MongoClient.connect(
                        url,
                        onConnectionUnsorted({
                            database,
                            moleculesCollection,
                            positionMatrixCollection,
                            numEntriesPerPage,
                            currentPageData,
                            ...options
                        })
                    );

                case SortedKind.Sorted:
                    return;

                default:
                    assertNever(options.state);
            }

    }
}



function assertNever(arg: never): never { throw Error(); }
