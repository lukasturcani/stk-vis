import { createSlice } from '@reduxjs/toolkit';
import { MoleculeRequestState } from '../MoleculeRequestState';
import { sendMoleculeRequest } from '../actions';


export const moleculeRequestState = createSlice({
    name: 'moleculeRequestState',
    initialState: MoleculeRequestState.NoRequestSent,
    reducers: {
        setMoleculeRequestState: (state, action) => action.payload,
    },
    extraReducers: builder => {
        builder.addCase(sendMoleculeRequest, (state, action) => {
            return MoleculeRequestState.RequestSent;
        });
    },
});
