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
    getMoleculeSelectionType,
} from '../../../../../selectors';
import {
    IInitialDatabaseBrowser,
    ILoadedDatabaseBrowser,
    DatabaseBrowserKind,
    MoleculeSelectionTypeKind,
    SortKind,
    IUnsortedBoth,
    IUnsortedOne,
    ISortedBoth,
    ISortedOne,
    IMoleculeSelectionType,
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
    kind: MoleculeSelectionTypeKind;
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
            getMoleculeSelectionType(state).kind,

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
    switch (options.state.sortKind)
    {
        case SortKind.Unsorted:
            return sendRequestLoadedUnsorted({
                ...options,
                state: options.state,
            });

        case SortKind.Sorted:
            return sendRequestLoadedSorted({
                ...options,
                state: options.state,
            });

        default:
            assertNever(options.state);
    }
}


interface LoadedUnsortedOptions
extends sendRequestLoadedOptions
{
    state: IUnsortedBoth | IUnsortedOne
}


function sendRequestLoadedUnsorted(
    options: LoadedUnsortedOptions,
)
    : void
{
    const selectionType: IMoleculeSelectionType
        = getMoleculeSelectionType(options.state);

    const onConnectionOptions: onConnectionOptions
        = getOnConnectionOptions(options.state);

    switch (state)
    {
        case MoleculeSelectionTypeKind.Both:
            const buildingBlockPositionMatrixCollection: string
                = getBBPosMatCol(options.state);

            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionUnsorted({
                    ...onConnectionOptions,
                    ...options,
                    buildingBlockPositionMatrixCollection,

                }),
            );

        case MoleculeSelectionTypeKind.BuildingBlocks:
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            return MongoClient.connect(
                onConnectionOptions.url,
                onConnectionUnsorted(options),
            );

        default:
            assertNever(selectionType);
    }
}


interface LoadedSortedOptions
extends sendRequestLoadedOptions
{
    state: ISortedBoth | ISortedOne
}


function sendRequestLoadedSorted(
    options: LoadedSortedOptions,
)
    : void
{

    switch (options.kind)
    {
        case MoleculeSelectionTypeKind.Both:
            const buildingBlockPositionMatrixCollection: string
                = getBBPosMatCol(options.state);

            return MongoClient.connect(
                options.url,
                onConnectionSorted({
                    sortType: getSortType(options.state),

                    sortedCollection:
                        getSortedCollection(options.state),

                    ...options,
                }),
            );

        case MoleculeSelectionTypeKind.BuildingBlock:
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            return MongoClient.connect(
                options.url,
                onConnectionSorted({
                    sortType: getSortType(options.state),

                    sortedCollection:
                        getSortedCollection(options.state),

                    ...options,
                }),
            );

        default:
            assertNever(options.kind);

    }

}


function assertNever(arg: never): never { throw Error(); }
