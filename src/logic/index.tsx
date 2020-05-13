import {
    createSlice,
    createAction,
} from '@reduxjs/toolkit';


export const updateTable = createAction(
    'moleculeViewer/updateTable',
    (molecules, columnValues) => {
        return {
            payload: {
                molecules,
                columnValues,
            },
        };
    },
);



export const moleculesSlice = createSlice({
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


export const visibleColumnsSlice = createSlice({
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


export const columnValuesSlice = createSlice({
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
