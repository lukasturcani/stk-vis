import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {
    reducers as DatabaseBrowserReducers
} from './features/DatabaseBrowser';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        ...DatabaseBrowserReducers,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
