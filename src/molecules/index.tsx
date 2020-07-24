import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    TwoDViewer,
} from 'molecules/connected/2d-viewer';
import {
    ThreeDViewer,
} from 'molecules/connected/3d-viewer';
import {
    MoleculeTable,
} from 'molecules/connected/molecule-table';
import {
    reducer,
    initialState,
    IMolecules,
} from 'Molecules.Molecules';
import { IAction } from 'Molecules.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore(
    (state: IMolecules | undefined, action: IAction) => {
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
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <MoleculeTable />
                <TwoDViewer />
                <ThreeDViewer />
            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
