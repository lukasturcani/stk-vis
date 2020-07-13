import { createAction } from '@reduxjs/toolkit'


export const updateMongoDbUrl = createAction(
    'DatabaseBrowser/updateMongoDbUrl',
    (url: string) => {
        return {
            payload: url,
        };
    },
);
