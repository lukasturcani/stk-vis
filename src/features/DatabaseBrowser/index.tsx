import {
    DatabaseBrowser as DatabaseBrowserComponent,
} from './components';
import { MoleculeTable } from './features/MoleculeTable';
import { MoleculeRequestState } from './features/MoleculeRequestState';


export const DatabaseBrowser: IFeature = {
    actions: {
        ...MoleculeTable.actions,
    },
    reducers: {
        ...MoleculeTable.reducers,
        ...MoleculeRequestState.reducers,
    },
    components: {
        DatabaseBrowser: DatabaseBrowserComponent,
    },
}
