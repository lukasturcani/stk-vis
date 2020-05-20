import { createAction } from '@reduxjs/toolkit'


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    (molecules, columnValues) => {
        return {
            payload: {
                molecules,
                columnValues,
            },
        };
    },
);
