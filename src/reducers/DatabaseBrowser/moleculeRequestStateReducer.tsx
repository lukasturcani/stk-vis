import { Action } from '@reduxjs/toolkit';
import { sendMoleculeRequest } from './actions';
import {
    IMoleculeRequestState,
    MoleculeRequestStateKind,
} from './model';
import { updateTable } from '../MoleculeTable';


export function moleculeRequestStateReducer(
    state: IMoleculeRequestState,
    action: Action,
): IMoleculeRequestState
{
    if (sendMoleculeRequest.match(action)) {
        return {
            kind: MoleculeRequestStateKind.RequestSent,
        };
    }
    if (updateTable.match(action)) {
        return {
            kind: MoleculeRequestStateKind.RequestSucceeded,
        };
    }
    return state;
}
