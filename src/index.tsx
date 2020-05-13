import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {
    moleculesSlice,
    visibleColumnsSlice,
    columnValuesSlice,
    updateTable,
} from './logic';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        molecules: moleculesSlice.reducer,
        visibleColumns: visibleColumnsSlice.reducer,
        columnValues: columnValuesSlice.reducer,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
