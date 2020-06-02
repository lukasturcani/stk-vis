import { createAction } from '@reduxjs/toolkit'
import {
    ISortSettings,
} from '../../models';


export const setSortSettings = createAction(
    'DatabaseBrowser/setSortSettings',
    (sortSettings: ISortSettings) => {
        return {
            payload: sortSettings,
        };
    },
);
