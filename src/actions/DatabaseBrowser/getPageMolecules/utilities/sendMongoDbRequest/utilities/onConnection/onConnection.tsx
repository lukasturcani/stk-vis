import { MongoClient, Cursor, MongoError } from 'mongodb';
import { AnyAction } from '@reduxjs/toolkit'
import { processArray } from './utilities';
import {
    MoleculeRequestStateKind,
} from '../../../../../../../models';
import {
    setMoleculeRequestState,
} from '../../../../../../../actions';
import { IPageData } from '../IPageData';
import {
    Maybe,
} from '../../../../../../../utilities';


interface onConnectionOptions
{
    database: string;
    moleculesCollection: string;
    propertyCollections: string[];
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}



export function onConnection(
    options: onConnectionOptions,
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
        const cursor: Cursor
            = client
            .db(options.database)
            .collection(options.moleculesCollection)
            .find({})
            .skip(
                options.pageIndex
                *
                options.numEntriesPerPage
            )
            // Add +1 to check if there is another entry on the next
            // page, which is used to determine if the current page is
            // the last page.
            .limit(options.numEntriesPerPage+1);

        cursor.toArray(processArray({ ...options, cursor, client }));
    };
}
