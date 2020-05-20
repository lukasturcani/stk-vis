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


export const reducers = {
    visibleColumns: visibleColumns.reducer,
    molecules: molecules.reducer,
    columnValues: columnValues.reducer,
};
