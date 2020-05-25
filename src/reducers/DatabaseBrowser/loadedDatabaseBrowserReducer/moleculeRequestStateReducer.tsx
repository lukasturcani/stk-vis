import { AnyAction } from '@reduxjs/toolkit';
import {
    IMoleculeRequestState,
    MoleculeRequestStateKind,
} from '../../../models';
import {
    updateTable,
    sendMoleculeRequest,
    setLastPage,
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
    if (
        updateTable.match(action)
        ||
        setLastPage.match(action)
    ) {
        return {
            kind: MoleculeRequestStateKind.RequestSucceeded,
        };
    }
    return state;
}
