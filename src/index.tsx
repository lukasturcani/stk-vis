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
        InChIKey: [
            'A',
            'B',
            'C',
            'D',
            'E',
        ],
        numAtoms: [
            1,
            2,
            4,
            40,
            21,
        ],
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
