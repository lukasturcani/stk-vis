import { createAction } from '@reduxjs/toolkit'


export const selectMolecule = createAction(
    'DatabaseBrowser/selectMolecule',
    (moleculeId: number) => ({ payload: moleculeId }),
);
