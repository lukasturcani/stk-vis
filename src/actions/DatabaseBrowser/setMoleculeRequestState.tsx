import { createAction } from '@reduxjs/toolkit'
import {
    MoleculeRequestStateKind,
} from '../../models';


export const setMoleculeRequestState = createAction(
    'DatabaseBrowser/setMoleculeRequestState',
    (kind: MoleculeRequestStateKind) => {
        return {
            payload: kind,
        };
    },
);
