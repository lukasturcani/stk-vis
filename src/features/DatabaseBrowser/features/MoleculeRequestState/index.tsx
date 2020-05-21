import {
    moleculeRequestState as moleculeRequestStateSlice
} from './slices';
import { sendMoleculeRequest } from './actions';


export const MoleculeRequestState: IFeature = {
    actions: {
        sendMoleculeRequest,
        ...moleculeRequestStateSlice.actions,
    },
    reducers: {
        moleculeRequestState: moleculeRequestStateSlice.reducer,
    },
    components: {
    },
}
