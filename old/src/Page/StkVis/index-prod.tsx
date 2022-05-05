import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    StkVis
} from './components/connected';
import {
    reducer,
    Action,
    Model,
    init,
} from 'Page.StkVis';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore(
    (model: Model | undefined, action: Action) => {
        if (model === undefined)
        {
            return init;
        }
        return reducer(model)(action);
    },
    undefined,
    applyMiddleware(thunk),
);


ReactDOM.render(
    <Provider store={ store }>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <div
                style={{
                    height: '98vh',
                    width: '98vw',
                }}
            >
                <StkVis />
            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
