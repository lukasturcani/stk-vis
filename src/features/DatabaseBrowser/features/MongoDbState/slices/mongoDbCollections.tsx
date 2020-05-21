import { createSlice } from '@reduxjs/toolkit';


export const mongoDbCollections = createSlice({
    name: 'mongoDbCollections',
    initialState: {
        molecules: 'molecules',
        position_matrices: 'position_matrices',
        numAtoms: 'numAtoms',
    },
    reducers: {
        setMongoDbMoleculeCollection: (state, action) => {
            state['molecules'] = action.payload;
            return state;
        },
        setMongoDbPositionMatrixCollection: (state, action) => {
            state['position_matrices'] = action.payload;
            return state;
        },
    },
});
