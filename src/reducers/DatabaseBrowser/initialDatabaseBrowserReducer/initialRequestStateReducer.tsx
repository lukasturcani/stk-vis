import { AnyAction } from '@reduxjs/toolkit';
import {
    IInitialRequestState,
    InitialRequestStateKind,
    MoleculeRequestStateKind,
} from '../../../models';
import {
    updateTable,
    sendMoleculeRequest,
    setMoleculeRequestState,
} from '../../../actions';


export function initialRequestStateReducer(
    state: IInitialRequestState = {
        kind: InitialRequestStateKind.NoRequestSent,
    },
    action: AnyAction,
)
    : IInitialRequestState
{
    if (sendMoleculeRequest.match(action))
    {
        return {
            kind: InitialRequestStateKind.RequestSent,
        };
    }
    if (updateTable.match(action))
    {
        return {
            kind: InitialRequestStateKind.RequestSucceeded,
        };
    }
    if (setMoleculeRequestState.match(action))
    {
        if (action.payload === MoleculeRequestStateKind.RequestFailed)
        {
            return {
                kind: InitialRequestStateKind.RequestFailed,
            };
        }
        if (
            action.payload
            ===
            MoleculeRequestStateKind.RequestSucceeded
        )
        {
            return {
                kind: InitialRequestStateKind.RequestSucceeded,
            };
        }
    }
    return state;
}
