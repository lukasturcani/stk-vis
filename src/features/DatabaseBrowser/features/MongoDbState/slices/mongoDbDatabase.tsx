import { createSlice } from '@reduxjs/toolkit';


export const mongoDbDatabase = createSlice({
    name: 'mongoDbDatabase',
    initialState: 'stkVis',
    reducers: {
        setMongoDbDatabase: (state, action) => action.payload,
    },
});
