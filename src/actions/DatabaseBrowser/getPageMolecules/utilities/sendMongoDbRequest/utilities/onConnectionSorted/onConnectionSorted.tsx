import {
    Maybe,
} from '../../../../../../../utilities';
import {
    SortedType,
} from '../../../../../../../models';
import { AnyAction } from '@reduxjs/toolkit'
import { IPageData } from '../IPageData';
import {
    MongoClient,
    MongoError,
    Db,
} from 'mongodb';
import {
    setMoleculeRequestState,
} from '../../../../../../../actions';
import {
    MoleculeRequestStateKind,
} from '../../../../../../../models';



interface onConnectionSortedOptions
{
    database: string;
    moleculesCollection: string;
    positionMatrixCollection: string;
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    sortedCollection: string;
    sortedType: SortedType;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
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

    };
}
