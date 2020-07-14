import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from './components/stk-vis';
import { updateFields } from 'StkVis.Reducers';
import { Provider } from 'react-redux';
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
    reducer: (state, action) => updateFields(state)(action),
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
