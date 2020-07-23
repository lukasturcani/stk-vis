import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    RequestManager,
} from 'request-manager/connected/request-manager';
import {
    reducer,
    initialState,
    IRequestManager,
} from 'RequestManager.RequestManager';
import { IAction } from 'RequestManager.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore(
    (state: IRequestManager | undefined, action: IAction) => {
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
            <RequestManager />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
