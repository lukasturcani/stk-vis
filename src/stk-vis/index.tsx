import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from './components/stk-vis';
import { reducer, initialState } from 'StkVis.StkVis';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';


const store = createStore(
    (state, action) => {
        if (state === undefined)
        {
            return initialState;
        }
        return reducer(state)(action);
    },
    undefined,
    applyMiddleware(logger),
);


ReactDOM.render(
    <Provider store={ store }>
        <StkVis />
    </Provider>,
    document.getElementById('root'),
);
