import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbBuildingBlockPositionMatrixCollection
    as getBBPosMatCol,
    getNumEntriesPerPage,
    getSortType,
    getSortedCollection,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SearchKind,
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


interface onConnectionOptions
{
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    numEntriesPerPage: number;
    kind: SearchKind;
    currentPageData: Maybe<IPageData>;
}

function getOnConnectionOptions(
    state: IInitialDatabaseBrowser | ILoadedDatabaseBrowser,
)
    : onConnectionOptions
{
    return {
        url:
            getMongoDbUrl(state),

        moleculeKey:
            getMongoDbMoleculeKey(state),

        database:
            getMongoDbDatabase(state),

        moleculeCollection:
            getMongoDbMoleculeCollection(state),

        positionMatrixCollection:
            getMongoDbPositionMatrixCollection(state),

        constructedMoleculeCollection:
            getMongoDbConstructedMoleculeCollection(state),

        numEntriesPerPage:
            getNumEntriesPerPage(state),

        kind:
            state.searchKind,

        currentPageData:
            maybeGetPageData(state),
    };
}


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

    switch (options.state.kind)
    {
        case DatabaseBrowserKind.Initial:

            const buildingBlockPositionMatrixCollection: string
                = getBBPosMatCol(options.state);

            const onConnectionOptions: onConnectionOptions
                = getOnConnectionOptions(options.state);

            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionUnsorted({
                    buildingBlockPositionMatrixCollection,
                    ...options,
                    ...onConnectionOptions,
                    kind: options.state.searchKind,
                })
            );

        case DatabaseBrowserKind.Loaded:
            return sendRequestLoaded({
                ...options,
                state: options.state,
            });

            break;

        default:
            assertNever(options.state);

    }
}


interface sendRequestLoadedOptions
{
    state: ILoadedDatabaseBrowser;
    pageIndex: number;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    dispatch: (arg: AnyAction) => void;
}

function sendRequestLoaded(
    options: sendRequestLoadedOptions,
)
    : void
{
    const onConnectionOptions: onConnectionOptions
        = getOnConnectionOptions(options.state);

    switch (options.state.searchKind)
    {
        case SearchKind.UnsortedBoth:
        {
            const buildingBlockPositionMatrixCollection: string
                = getBBPosMatCol(options.state);

            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionUnsorted({
                    ...onConnectionOptions,
                    ...options,
                    buildingBlockPositionMatrixCollection,
                    kind: options.state.searchKind,
                }),
            );
        }

        case SearchKind.UnsortedBuildingBlocks:
        case SearchKind.UnsortedConstructedMolecules:
        {
            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionUnsorted({
                    ...onConnectionOptions,
                    ...options,
                    kind: options.state.searchKind,
                }),
            );
        }

        case SearchKind.SortedBoth:
        {
            const buildingBlockPositionMatrixCollection: string
                = getBBPosMatCol(options.state);

            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionSorted({

                    sortedCollection:
                        getSortedCollection(options.state),

                    sortType:
                        getSortType(options.state),

                    ...options,
                    ...onConnectionOptions,
                    buildingBlockPositionMatrixCollection,
                    kind: options.state.searchKind,
                }),
            );
        }

        case SearchKind.SortedBuildingBlocks:
        case SearchKind.SortedConstructedMolecules:
        {
            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionSorted({

                    sortedCollection:
                        getSortedCollection(options.state),

                    sortType:
                        getSortType(options.state),

                    ...options,
                    ...onConnectionOptions,
                    kind: options.state.searchKind,
                }),
            );
        }

        default:
        {
            assertNever(options.state);
        }
    }
}


function assertNever(arg: never): never { throw Error(); }
