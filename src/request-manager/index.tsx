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
import {
    Action,
    initializeUnsortedAll,
    initializeUnsortedBuildingBlocks,
    initializeUnsortedConstructedMolecules,
    initializeSortedAll,
    initializeSortedBuildingBlocks,
    initializeSortedConstructedMolecules,
} from 'RequestManager.Action';
import {
    PageKind,
    middle,
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
    (state: RequestManager | undefined, action: Action) => {
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

const pageKind: PageKind
    = middle;

const sortedCollection: string
    = 'numAtoms';

const sortType: SortType
    = ascending;


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
                    onClick={
                        () => store.dispatch(
                            initializeSortedAll({
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
                                sortedCollection,
                                sortType,
                            })
                        )
                    }
                >
                    SortedAll
                </button>

                <button
                    onClick={
                        () => store.dispatch(
                            initializeSortedBuildingBlocks({
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
                                sortedCollection,
                                sortType,
                            })
                        )
                    }
                >
                    SortedBuildingBlocks
                </button>

                <button
                    onClick={
                        () => store.dispatch(
                            initializeSortedConstructedMolecules({
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
                                sortedCollection,
                                sortType,
                            })
                        )
                    }
                >
                    SortedConstructedMolecules
                </button>

            </div>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
