import { createAction } from '@reduxjs/toolkit'


export const updateMongoDbMoleculeCollection = createAction(
    'DatabaseBrowser/updateMongoDbMoleculeCollection',
    (moleculeCollection: string) => {
        return {
            payload: moleculeCollection,
        };
    },
);
