import { createSlice } from '@reduxjs/toolkit';
import { updateTable } from '../actions';


export const molecules = createSlice({
    name: 'molecules',
    initialState: [
        {},
        {},
        {},
        {},
        {},
    ],
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(updateTable, (state, action) => {
            return action.payload.molecules;
        });
    },
});
