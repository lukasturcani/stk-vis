import { AnyAction } from '@reduxjs/toolkit';
import {
    IMoleculeRequestState,
    MoleculeRequestStateKind,
} from '../../../models';
import {
    updateTable,
    sendMoleculeRequest,
    setMoleculeRequestState,
} from '../../../actions';


export function moleculeRequestStateReducer(
    state: IMoleculeRequestState = {
        kind: MoleculeRequestStateKind.RequestSucceeded,
    },
    action: AnyAction,
)
    : IMoleculeRequestState
{
    if (sendMoleculeRequest.match(action))
    {
        return {
            kind: MoleculeRequestStateKind.RequestSent,
        };
    }
    if (updateTable.match(action))
    {
        return {
            kind: MoleculeRequestStateKind.RequestSucceeded,
        };
    }
    if (setMoleculeRequestState.match(action))
    {
        return {
            kind: action.payload,
        };
    }
    return state;
}
