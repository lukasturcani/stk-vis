import { createAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestState
} from '../../MoleculeRequestState/MoleculeRequestState';


function assertNever(arg: never): never { throw Error(); }


export const getNextMolecules = (dispatch, getState) => {
    const { moleculeRequestState }
        : { moleculeRequestState: MoleculeRequestState }
        = getState();

    switch (moleculeRequestState) {
        case MoleculeRequestState.NoRequestSent:
        case MoleculeRequestState.RequestSucceeded:
        case MoleculeRequestState.RequestFailed:
            console.log('dispatch');
            break;
        case MoleculeRequestState.RequestSent:
            break;
        default:
            assertNever(moleculeRequestState);
            break;
    };
};
