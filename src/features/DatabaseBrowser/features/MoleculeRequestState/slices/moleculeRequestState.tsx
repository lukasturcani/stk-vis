import { createSlice } from '@reduxjs/toolkit';
import { MoleculeRequestState } from '../MoleculeRequestState';


export const moleculeRequestState = createSlice({
    name: 'moleculeRequestState',
    initialState: MoleculeRequestState.NoRequestSent,
    reducers: {
    },
    /*
    extraReducers: builder => {
        builder.addCase(updateTable, (state, action) => {
            return action.payload.columnValues;
        });
    },
     */
});
