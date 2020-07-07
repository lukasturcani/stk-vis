import {
    getMongoDbUrl,
    getMongoDbMoleculeKey,
    getMongoDbDatabase,
    getMongoDbMoleculeCollection,
    getMongoDbPositionMatrixCollection,
    getMongoDbConstructedMoleculeCollection,
    getMongoDbBuildingBlockPositionMatrixCollection,
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

    const moleculeKey: string
        = getMongoDbMoleculeKey(options.state);

    const database: string
        = getMongoDbDatabase(options.state);

    const moleculeCollection: string
        = getMongoDbMoleculeCollection(options.state);

    const positionMatrixCollection: string
        = getMongoDbPositionMatrixCollection(options.state);

    const constructedMoleculeCollection: string
        = getMongoDbConstructedMoleculeCollection(options.state);

    const buildingBlockPositionMatrixCollection: string
        = getMongoDbBuildingBlockPositionMatrixCollection(
            options.state,
        );

    const numEntriesPerPage: number
        = getNumEntriesPerPage(options.state);

    const kind: MoleculeSelectionTypeKind
        = getMoleculeSelectionType(options.state).kind;

    const currentPageData: Maybe<IPageData>
        = maybeGetPageData(options.state);

    switch (options.state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return MongoClient.connect(url, onConnectionUnsorted({
                kind,
                database,
                moleculeKey,
                moleculeCollection,
                positionMatrixCollection,
                constructedMoleculeCollection,
                buildingBlockPositionMatrixCollection,
                numEntriesPerPage,
                currentPageData,
                ...options,
            }));

        case DatabaseBrowserKind.Loaded:
            switch (options.state.sortKind)
            {
                case SortKind.Unsorted:
                    return MongoClient.connect(
                        url,
                        onConnectionUnsorted({
                            kind,
                            database,
                            moleculeKey,
                            moleculeCollection,
                            positionMatrixCollection,
                            constructedMoleculeCollection,
                            buildingBlockPositionMatrixCollection,
                            numEntriesPerPage,
                            currentPageData,
                            ...options,
                        }),
                    );

                case SortKind.Sorted:
                    return MongoClient.connect(
                        url,
                        onConnectionSorted({
                            kind,
                            database,
                            moleculeKey,
                            moleculeCollection,
                            constructedMoleculeCollection,
                            positionMatrixCollection,
                            buildingBlockPositionMatrixCollection,
                            numEntriesPerPage,
                            currentPageData,
                            sortType: getSortType(options.state),

                            sortedCollection:
                                getSortedCollection(options.state),

                            ...options,
                        }),
                    );

                default:
                    assertNever(options.state);
            }

    }
}



function assertNever(arg: never): never { throw Error(); }
