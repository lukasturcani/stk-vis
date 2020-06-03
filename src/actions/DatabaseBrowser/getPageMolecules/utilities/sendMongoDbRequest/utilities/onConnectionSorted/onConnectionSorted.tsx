import {
    Maybe,
} from '../../../../../../../utilities';
import {
    SortType,
} from '../../../../../../../models';
import { AnyAction } from '@reduxjs/toolkit'
import { IPageData } from '../IPageData';
import {
    MongoClient,
    MongoError,
    Cursor,
    Db,
    CommandCursor,
} from 'mongodb';
import {
    setMoleculeRequestState,
} from '../../../../../../../actions';
import {
    MoleculeRequestStateKind,
} from '../../../../../../../models';
import { processArray } from './utilities';



interface onConnectionSortedOptions
{
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    sortedCollection: string;
    sortType: SortType;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}


interface ICollectionData
{
    name: string;
}



export function onConnectionSorted(
    options: onConnectionSortedOptions,
)
    : (err: MongoError, client: MongoClient) => void
{
    return (err: MongoError, client: MongoClient): void => {
        if ( err !== null)
        {
            options.dispatch(
                setMoleculeRequestState(
                    MoleculeRequestStateKind.RequestFailed
                )
            );
            options.errorSnackbar(
                'Could not connect to the database.'
            );
            return;
        }
        const db: Db
            = client
            .db(options.database)

        const reservedNames: Set<string>
            = new Set([
                options.moleculeCollection,
                options.positionMatrixCollection,
                options.sortedCollection,
            ]);


        const collectionsCursor: CommandCursor
            = db.listCollections(
                undefined,
                { nameOnly: true },
            )

        collectionsCursor.toArray()
            .then((collections: ICollectionData[]) => {

            const propertyCollections: string[]
                = collections.filter(
                (collectionData: ICollectionData) => {
                    return !reservedNames.has(collectionData.name);
                }
                ).map(
                    (collectionData: ICollectionData) => {
                        return collectionData.name;
                    }
                );
            collectionsCursor.close()

            const cursor: Cursor
                = db
                .collection(options.sortedCollection)
                .find({})
                .sort(
                    'v',
                    (options.sortType === SortType.Ascending)? 1 : -1,
                )
                .skip(
                    options.pageIndex
                    *
                    options.numEntriesPerPage
                )
                // Add +1 to check if there is another entry on the
                // next page, which is used to determine if the current
                // page is the last page.
                .limit(options.numEntriesPerPage+1);

            cursor.toArray(
                processArray({
                    ...options,
                    cursor,
                    client,
                    propertyCollections,
                })
            );
        }).catch(() => {
            options.dispatch(
                setMoleculeRequestState(
                    MoleculeRequestStateKind.RequestFailed
                )
            );
            options.errorSnackbar(
                'Could not connect to the database.'
            );
        });
    };
}
