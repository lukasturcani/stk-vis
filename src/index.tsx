import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


function nextMolecules(state, action) {
    return state;
}


const store = configureStore({
    reducer: nextMolecules,
    preloadedState: {
        molecules: [
            {},
            {},
            {},
            {},
            {},
        ],
        InChIKey: {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
        },
        numAtoms: {
            0: 1,
            1: 2,
            2: 4,
            3: 40,
            4: 21,
        },
        visibleColumns: [
            'InChIKey',
            'numAtoms',
        ],
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
