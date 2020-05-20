import { MoleculeTable } from './components';
import { visibleColumns, molecules, columnValues } from './slices';
import { actions as sharedActions } from './actions';

export const components = {
    MoleculeTable
};

export const actions = {
    ...visibleColumns.actions,
    ...molecules.actions,
    ...columnValues.actions,
    ...sharedActions,
};


export const reducers = [
    visibleColumns.reducer,
    molecules.reducer,
    columnValues.reducer,
];
