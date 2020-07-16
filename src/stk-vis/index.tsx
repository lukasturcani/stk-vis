import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from './components/stk-vis';
import { reducer, initialState, IStkVis } from 'StkVis.StkVis';
import { IAction } from 'StkVis.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const store = createStore(
    (state: IStkVis | undefined, action: IAction) => {
        if (state === undefined)
        {
            return initialState;
        }
        return reducer(state)(action);
    },
    undefined,
    applyMiddleware(logger, thunk),
);


ReactDOM.render(
    <Provider store={ store }>
        <StkVis />
    </Provider>,
    document.getElementById('root'),
);
