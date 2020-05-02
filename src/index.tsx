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
        moleculeKeyName: 'InChIKey',
        InChIKey: [
            'A',
            'B',
            'C',
            'D',
            'E',
        ],
        molecules: [
            {},
            {},
            {},
            {},
            {},
        ],
        numAtoms: {
            A: 1,
            B: 2,
            C: 4,
            D: 40,
            E: 21,
        },
        visibleColumns: [
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
