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
    Molecules,
} from 'Molecules.Molecules';
import { Molecule } from 'Molecules.Molecule';
import {
    molecule,
} from 'Molecules.Utils'
import { Action } from 'Molecules.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { selectingCollection } from 'SelectingCollection';


const store = createStore(
    (state: Molecules | undefined, action: Action) => {
        if (state === undefined)
        {
            // Needs the variable to give the correct type to
            // the empty list for the selectingCollection call.
            const empty: Molecule[] = [];

            return initialState
            (['one', 'two', 'three'])
            (
                selectingCollection
                (empty)
                (molecule)
                ([])
            );
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
                <div
                    style={{
                        height: '25%',
                        width: '25%',
                    }}
                >
                    <MoleculeTable />
                </div>
                <div
                    style={{
                        height: '25%',
                        width: '25%',
                    }}
                >
                    <TwoDViewer />
                </div>
                <div
                    style={{
                        height: '25%',
                        width: '25%',
                    }}
                >
                    <ThreeDViewer />
                </div>
            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);

// Add database molecules.



