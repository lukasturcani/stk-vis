import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from './components/stk-vis';
import { updateFields } from 'StkVis.StkVis.Reducers';
import { initialState } from 'StkVis.StkVis';
import { Provider } from 'react-redux';
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';


const store = configureStore({
    reducer: (state, action) => {
        if (state === undefined)
        {
            return initialState;
        }
        return updateFields(state)(action);
    },
    middleware: [
        ...getDefaultMiddleware(),
        logger,
    ],
});


ReactDOM.render(
    <Provider store={ store }>
        <StkVis />
    </Provider>,
    document.getElementById('root'),
);
