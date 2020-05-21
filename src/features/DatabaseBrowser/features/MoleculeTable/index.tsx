import {
    MoleculeTable as MoleculeTableComponent,
} from './components';
import { visibleColumns, molecules, columnValues } from './slices';
import { actions as sharedActions } from './actions';


export const MoleculeTable = {
    actions: {
        ...visibleColumns.actions,
        ...molecules.actions,
        ...columnValues.actions,
        ...sharedActions,
    },
    reducers: {
        visibleColumns: visibleColumns.reducer,
        molecules: molecules.reducer,
        columnValues: columnValues.reducer,
    },
    components: {
        MoleculeTable: MoleculeTableComponent,
    },
}
