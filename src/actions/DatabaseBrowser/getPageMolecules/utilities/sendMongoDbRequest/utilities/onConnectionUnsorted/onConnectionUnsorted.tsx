import {
    MongoClient,
    AggregationCursor,
    MongoError,
    Db,
    CommandCursor,
} from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import {
    processArray,
    getReservedNames,
    getMoleculeTypeFilter,
} from './utilities';
import {
    MoleculeRequestStateKind,
    MoleculeSelectionTypeKind,
} from '../../../../../../../models';
import {
    setMoleculeRequestState,
} from '../../../../../../../actions';
import { IPageData } from '../IPageData';
import {
    Maybe,
} from '../../../../../../../utilities';


interface OptionsBase
{
    kind: MoleculeSelectionTypeKind;
    database: string;
    moleculeKey: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}


interface SelectBoth extends OptionsBase
{
    kind: MoleculeSelectionTypeKind.Both;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        MoleculeSelectionTypeKind.BuildingBlocks
        |
        MoleculeSelectionTypeKind.ConstructedMolecules;
}



type Options =
    | SelectBoth
    | SelectOne



interface ICollectionData
{
    name: string;
}


export function onConnectionUnsorted(
    options: Options,
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
            = getReservedNames(options);

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

            const cursor: AggregationCursor
                = db
                .collection(options.moleculeCollection)
                .aggregate(getMoleculeTypeFilter(
                    options.kind,
                    options.moleculeKey,
                    options.constructedMoleculeCollection,
                ))
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
