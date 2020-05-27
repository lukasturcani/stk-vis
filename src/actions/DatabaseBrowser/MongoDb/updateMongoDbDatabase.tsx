import { createAction } from '@reduxjs/toolkit'


export const updateMongoDbDatabase = createAction(
    'DatabaseBrowser/updateMongoDbDatabase',
    (database: string) => {
        return {
            payload: database,
        };
    },
);
