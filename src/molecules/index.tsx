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
import {
    initializeMolecules,
} from 'Molecules.Utils.UnsortedAll';
import * as Action from 'Molecules.Action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { selectingCollection } from 'SelectingCollection';
import { request } from 'Requests.UnsortedAll';
import Grid from '@material-ui/core/Grid';


const store = createStore(
    (state: Molecules | undefined, action: Action.Action) => {
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
            <Grid container
                style={{
                    height: '100vh',
                    width: '100vw',
                    margin: 0,
                    padding: 10,
                }}
                spacing={3}
                alignItems='center'
                justify='center'
                direction='row'
            >
                <Grid item
                    xs={6}
                    style={{
                        height: '100%',
                    }}
                >
                    <MoleculeTable />
                </Grid>
                <Grid item
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    xs={6}
                >
                    <Grid container
                        style={{
                            height: '100%',
                            width: '100%',
                            margin: 0,
                            padding: 10,
                        }}
                        spacing={3}
                        alignItems='center'
                        justify='center'
                        direction='row'
                    >
                        <Grid item
                            xs={12}
                            style={{
                                height: '50%',
                            }}
                        >
                            <TwoDViewer />
                        </Grid>
                        <Grid item
                            xs={12}
                            style={{
                                height: '50%',
                            }}
                        >
                            <ThreeDViewer />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);

// Add database molecules.
const moleculeKey: string = 'InChIKey';

request()({
    url: 'mongodb://localhost:27017',
    database: 'stkVis',
    moleculeKey,
    moleculeCollection: 'molecules',
    positionMatrixCollection: 'position_matrices',
    buildingBlockPositionMatrixCollection:
        'building_block_position_matrices',
    pageIndex: 0,
    numEntriesPerPage: 34,
    ignoredCollections: [],
}).then(
    result => initializeMolecules
        (store.dispatch)(moleculeKey)(result)
);
