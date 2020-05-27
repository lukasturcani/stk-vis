import { createAction } from '@reduxjs/toolkit'


export const updateMongoDbPositionMatrixCollection = createAction(
    'DatabaseBrowser/updateMongoDbPositionMatrixCollection',
    (positionMatrixCollection: string) => {
        return {
            payload: positionMatrixCollection,
        };
    },
);
