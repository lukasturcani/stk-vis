import { createAction } from '@reduxjs/toolkit'


export const sendMoleculeRequest = createAction(
    'DatabaseBrowser/MoleculeRequestState/sendMoleculeRequest',
    () => {
        return { payload: true };
    },
);
