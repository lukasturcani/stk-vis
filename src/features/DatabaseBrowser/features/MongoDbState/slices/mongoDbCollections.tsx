import { createSlice } from '@reduxjs/toolkit';


export const mongoDbCollections = createSlice({
    name: 'mongoDbCollections',
    initialState: {
        molecules: 'molecules',
        numAtoms: 'numAtoms',
    },
    reducers: {
        setMongoDbMoleculeCollection: (state, action) => {
            state['molecules'] = action.payload;
            return state;
        },
    },
});
