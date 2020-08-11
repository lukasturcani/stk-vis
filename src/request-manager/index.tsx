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
    RequestManager,
} from 'RequestManager.RequestManager';
import * as Action from 'RequestManager.Action';

import * as UnsortedAll
from 'RequestManager.InitializeUnsortedAll';

import * as UnsortedBBs
from 'RequestManager.InitializeUnsortedBuildingBlocks';

import * as UnsortedCMs
from 'RequestManager.InitializeUnsortedConstructedMolecules';

import {
    PageKind,
    middle,
    first,
    lastComplete,
    lastIncomplete,
    onlyComplete,
    onlyIncomplete,
} from 'RequestManager.PageKind';
import {
    SortType,
    ascending,
} from 'RequestManager.SortType';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import  { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore(
    (state: RequestManager | undefined, action: Action.Action) => {
        if (state === undefined)
        {
            return initialState;
        }
        return reducer(state)(action);
    },
    undefined,
    applyMiddleware(logger, thunk),
);

const url: string
    = 'mongodb://localhost:27017';

const database: string
    = 'stkVis';

const moleculeKey: string
    = 'InChIKey';

const moleculeCollection: string
    = 'molecules';

const constructedMoleculeCollection: string
    = 'constructed_molecules';

const positionMatrixCollection: string
    = 'position_matrices';

const buildingBlockPositionMatrixCollection: string
    = 'building_block_position_matrices';

const pageIndex: number
    = 0;

const numEntriesPerPage: number
    = 34;

const ignoredCollections: string[]
    = [];

let pageKind: PageKind
    = middle;

const sortedCollection: string
    = 'numBonds';

const sortType: SortType
    = ascending;

const initializeUnsortedAll
    = (data: UnsortedAll.UnsortedAllData) =>
        Action.initializeUnsortedAll(
            UnsortedAll.initializeUnsortedAll(data)
        );

const initializeUnsortedBuildingBlocks
    = (data: UnsortedBBs.UnsortedBuildingBlocksData) =>
        Action.initializeUnsortedBuildingBlocks(
            UnsortedBBs.initializeUnsortedBuildingBlocks(data)
        );

const initializeUnsortedConstructedMolecules
    = (data: UnsortedCMs.UnsortedConstructedMoleculesData) =>
        Action.initializeUnsortedConstructedMolecules(
            UnsortedCMs.initializeUnsortedConstructedMolecules(data)
        );

ReactDOM.render(
    <Provider store={ store }>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <div>
                <BackButton />
                <NextButton />
                <SortButton />

                <button
                    onClick={
                        () => store.dispatch(
                            initializeUnsortedAll({
                                url,
                                database,
                                moleculeKey,
                                moleculeCollection,
                                positionMatrixCollection,
                                buildingBlockPositionMatrixCollection,
                                pageIndex,
                                numEntriesPerPage,
                                ignoredCollections,
                                pageKind,
                            })
                        )
                    }
                >
                    UnsortedAll
                </button>

                <button
                    onClick={
                        () => store.dispatch(
                            initializeUnsortedBuildingBlocks({
                                url,
                                database,
                                moleculeKey,
                                moleculeCollection,
                                constructedMoleculeCollection,
                                positionMatrixCollection,
                                pageIndex,
                                numEntriesPerPage,
                                ignoredCollections,
                                pageKind,
                            })
                        )
                    }
                >
                    UnsortedBuildingBlocks
                </button>

                <button
                    onClick={
                        () => store.dispatch(
                            initializeUnsortedConstructedMolecules({
                                url,
                                database,
                                moleculeKey,
                                moleculeCollection,
                                constructedMoleculeCollection,
                                positionMatrixCollection,
                                pageIndex,
                                numEntriesPerPage,
                                ignoredCollections,
                                pageKind,
                            })
                        )
                    }
                >
                    UnsortedConstructedMolecules
                </button>

                <button
                    onClick={ () => { pageKind = first; } }
                >
                    First
                </button>
                <button
                    onClick={ () => { pageKind = middle; } }
                >
                    Middle
                </button>
                <button
                    onClick={ () => { pageKind = lastComplete; } }
                >
                    Last Complete
                </button>
                <button
                    onClick={ () => { pageKind = lastIncomplete; } }
                >
                    Last Incomplete
                </button>
                <button
                    onClick={ () => { pageKind = onlyComplete; } }
                >
                    Only Complete
                </button>
                <button
                    onClick={ () => { pageKind = onlyIncomplete; } }
                >
                    Only Incomplete
                </button>

            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
