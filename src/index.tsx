import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { IStore } from './models';
import { databaseBrowserReducer } from './reducers';
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';


const store: IStore = configureStore({
    reducer: databaseBrowserReducer as any,
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
