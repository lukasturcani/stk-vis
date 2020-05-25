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


export function getPageMoleculesInitial(
    pageIndex: number,
    dispatch: (arg: AnyAction) => void,
    state: IInitialDatabaseBrowser,
)
    : void
{
    const initialRequestState: IInitialRequestState
        = getInitialRequestState(state);

    switch (initialRequestState.kind) {
        case InitialRequestStateKind.NoRequestSent:
        case InitialRequestStateKind.RequestSucceeded:
        case InitialRequestStateKind.RequestFailed:
            dispatch(sendMoleculeRequest());
            sendMongoDbRequest(state, pageIndex, dispatch);
            break;

        case InitialRequestStateKind.RequestSent:
            break;

        default:
            assertNever(initialRequestState);
            break;
    };

}
