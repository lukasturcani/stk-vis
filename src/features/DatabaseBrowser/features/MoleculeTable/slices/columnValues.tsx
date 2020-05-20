import { createSlice } from '@reduxjs/toolkit';
import { updateTable } from '../actions';


export const columnValues = createSlice({
    name: 'columnValues',
    initialState: {
        InChIKey: {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
        },
        numAtoms: {
            0: 1,
            1: 2,
            2: 4,
            3: 40,
            4: 21,
        },
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(updateTable, (state, action) => {
            return action.payload.columnValues;
        });
    },
});
