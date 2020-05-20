import { createAction } from '@reduxjs/toolkit'


export const getNextMolecules = createAction(
    'DatabaseBrowser/NextButton/getNextMolecules',
    () => {
        console.log('dispatched');
        return {
            payload: {
            },
        };
    },
);
