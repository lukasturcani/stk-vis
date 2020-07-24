import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    BackButton,
} from 'request-manager/connected/back-button';
import {
    NextButton,
} from 'request-manager/connected/next-button';
import {
    SortButton,
} from 'request-manager/connected/sort-button';
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
            <div>
                <BackButton />
                <NextButton />
                <SortButton />
            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
