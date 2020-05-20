import {
    createSlice,
    createAction,
} from '@reduxjs/toolkit';


export const getNextMolecules = createAction(
    'moleculeViewer/getNextMolecules',
    (number: number) => {
        return {
            payload: {
                number,
            }
        };
    },
);









