import {
    DatabaseBrowser as DatabaseBrowserComponent,
} from './components';
import { MoleculeTable } from './features/MoleculeTable';
import { MoleculeRequestState } from './features/MoleculeRequestState';
import { MongoDbState } from './features/MongoDbState';


export const DatabaseBrowser = {
    actions: {
        ...MoleculeTable.actions,
        ...MongoDbState.actions,
    },
    reducers: {
        ...MoleculeTable.reducers,
        ...MoleculeRequestState.reducers,
        ...MongoDbState.reducers,
    },
    components: {
        DatabaseBrowser: DatabaseBrowserComponent,
    },
}
