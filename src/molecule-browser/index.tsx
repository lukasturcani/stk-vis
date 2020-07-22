import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    MoleculeBrowser,
} from 'molecule-browser/connected/molecule-browser';
import {
    reducer,
    initialState,
    IMongoConfigurator,
} from 'MoleculeBrowser.MoleculeBrowser';
import { IAction } from 'MongoConfigurator.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore(
    (state: IMongoConfigurator | undefined, action: IAction) => {
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
            <MoleculeBrowser />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
