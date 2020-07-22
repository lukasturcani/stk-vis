import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from 'stk-vis/connected/stk-vis';
import { reducer, initialState, IStkVis } from 'StkVis.StkVis';
import { IAction } from 'StkVis.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


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
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <StkVis />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
