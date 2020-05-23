import { Action } from '@reduxjs/toolkit';
import { sendMoleculeRequest } from '../../actions';
import { IMoleculeRequestState,
    MoleculeRequestStateKind,
} from '../../models';
import { updateTable } from '../../actions';


const initialRequestState: IMoleculeRequestState = {
    kind: MoleculeRequestStateKind.NoRequestSent,
};


export function moleculeRequestStateReducer(
    state: IMoleculeRequestState,
    action: Action,
): IMoleculeRequestState
{
    if (state === undefined) {
        return initialRequestState;
    }

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
