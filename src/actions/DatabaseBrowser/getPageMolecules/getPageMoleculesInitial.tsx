import { AnyAction } from '@reduxjs/toolkit'
import {
    InitialRequestStateKind,
    IInitialRequestState,
    IInitialDatabaseBrowser,
    IMolecule,
    IColumnValues,
} from '../../../models';
import { updateTable } from '../updateTable';
import { sendMoleculeRequest } from '../sendMoleculeRequest';
import { MongoClient, Cursor } from 'mongodb';
import {
    getInitialRequestState,
} from '../../../selectors';
import { assertNever, sendMongoDbRequest } from './utilities';


interface getPageMoleculesInitialOptions
{
    pageIndex: number;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    dispatch: (arg: AnyAction) => void;
    state: IInitialDatabaseBrowser;
}


export function getPageMoleculesInitial(
    options: getPageMoleculesInitialOptions,
)
    : void
{
    const initialRequestState: IInitialRequestState
        = getInitialRequestState(options.state);

    switch (initialRequestState.kind) {
        case InitialRequestStateKind.NoRequestSent:
        case InitialRequestStateKind.RequestSucceeded:
        case InitialRequestStateKind.RequestFailed:
            options.dispatch(sendMoleculeRequest());
            sendMongoDbRequest(options);
            break;

        case InitialRequestStateKind.RequestSent:
            break;

        default:
            assertNever(initialRequestState);
            break;
    };

}
