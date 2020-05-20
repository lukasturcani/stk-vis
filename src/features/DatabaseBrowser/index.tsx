import { DatabaseBrowser } from './components';
import {
    actions as MoleculeTableActions,
    reducers as MoleculeTableReducers,
} from './features/MoleculeTable';

export const actions = {
    ...MoleculeTableActions,

};


export const reducers = {
    ...MoleculeTableReducers,
};


export const components = {
    DatabaseBrowser,
};
