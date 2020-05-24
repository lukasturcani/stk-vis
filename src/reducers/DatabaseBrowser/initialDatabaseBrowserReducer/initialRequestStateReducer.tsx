import { AnyAction } from '@reduxjs/toolkit';
import {
    IInitialRequestState,
    InitialRequestStateKind,
} from '../../../models';
import { updateTable, sendMoleculeRequest } from '../../../actions';


export function initialRequestStateReducer(
    state: IInitialRequestState = {
        kind: InitialRequestStateKind.NoRequestSent,
    },
    action: AnyAction,
)
    : IInitialRequestState
{
    if (sendMoleculeRequest.match(action)) {
        return {
            kind: InitialRequestStateKind.RequestSent,
        };
    }
    if (updateTable.match(action)) {
        return {
            kind: InitialRequestStateKind.RequestSucceeded,
        };
    }
    return state;
}
