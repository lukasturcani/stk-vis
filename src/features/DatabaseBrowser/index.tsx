import {
    DatabaseBrowser as DatabaseBrowserComponent,
} from './components';
import { MoleculeTable } from './features/MoleculeTable';


export const DatabaseBrowser: IFeature = {
    actions: {
        ...MoleculeTable.actions,
    },
    reducers: {
        ...MoleculeTable.reducers,
    },
    components: {
        DatabaseBrowser: DatabaseBrowserComponent,
    },
}
