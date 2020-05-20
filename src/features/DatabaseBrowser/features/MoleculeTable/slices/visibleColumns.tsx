import { createSlice } from '@reduxjs/toolkit';


export const visibleColumns = createSlice({
    name: 'visibleColumns',
    // Needs to be an array and not a set because order is important.
    initialState: [
        'InChIKey',
        'numAtoms',
    ],
    reducers: {
        addColumn: (state, action) => [...state, action.payload],
        removeColumn: (state, action) =>
            state.filter(column => column != action.payload),
    },
});
