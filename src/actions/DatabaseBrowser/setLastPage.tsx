import { createAction } from '@reduxjs/toolkit'


export const setLastPage = createAction(
    'DatabaseBrowser/setLastPage',
    () => {
        return { payload: true };
    },
);
