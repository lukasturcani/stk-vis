import { createAction } from '@reduxjs/toolkit'


export const updateTable = createAction(
    'moleculeViewer/updateTable',
    (molecules, columnValues) => {
        return {
            payload: {
                molecules,
                columnValues,
            },
        };
    },
);
