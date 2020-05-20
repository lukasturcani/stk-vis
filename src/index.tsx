import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { DatabaseBrowser } from './features/DatabaseBrowser';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        ...DatabaseBrowser.reducers,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
