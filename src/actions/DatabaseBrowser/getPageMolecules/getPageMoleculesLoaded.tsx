import { AnyAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestStateKind,
    IMoleculeRequestState,
    ILoadedDatabaseBrowser,
} from '../../../models';
import { updateTable } from '../updateTable';
import { sendMoleculeRequest } from '../sendMoleculeRequest';
import { MongoClient } from 'mongodb';
import {
    getMoleculeRequestState,
} from '../../../selectors';
import { assertNever, sendMongoDbRequest } from './utilities';


export function getPageMoleculesLoaded(
    pageIndex: number,
    successSnackbar: (message: string) => void,
    dispatch: (arg: AnyAction) => void,
    state: ILoadedDatabaseBrowser,
)
    : void
{
    const moleculeRequestState: IMoleculeRequestState
        = getMoleculeRequestState(state);

    switch (moleculeRequestState.kind) {
        case MoleculeRequestStateKind.RequestSucceeded:
        case MoleculeRequestStateKind.RequestFailed:
            dispatch(sendMoleculeRequest());
            sendMongoDbRequest(
                state,
                pageIndex,
                successSnackbar,
                dispatch,
            );
            break;

        case MoleculeRequestStateKind.RequestSent:
            break;

        default:
            assertNever(moleculeRequestState);
            break;
    };

}
