import { createSlice } from '@reduxjs/toolkit';


export const mongoDbDatabase = createSlice({
    name: 'mongoDbDatabase',
    initialState: 'stk',
    reducers: {
        setMongoDbDatabase: (state, action) => action.payload,
    },
});
