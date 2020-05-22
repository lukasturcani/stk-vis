import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IDatabaseBrowser } from './models';
import { databaseBrowserReducer } from './reducers';
import { Provider } from 'react-redux';
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const store = configureStore({
    reducer: {
        databaseBrowser: databaseBrowserReducer,
    },
    middleware: [
        ...getDefaultMiddleware(),
        logger,
    ],
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
