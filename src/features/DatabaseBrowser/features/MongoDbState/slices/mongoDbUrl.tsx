import { createSlice } from '@reduxjs/toolkit';


export const mongoDbUrl = createSlice({
    name: 'mongoDbUrl',
    initialState: 'mongodb://localhost:27017',
    reducers: {
        setMongoDbUrl: (state, action) => action.payload,
    },
});
