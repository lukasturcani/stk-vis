import {
    NextButton as NextButtonComponent,
} from './components';
import { actions as sharedActions } from './actions';


export const NextButton = {
    actions: {
        ...sharedActions,
    },
    reducers: {
    },
    components: {
        NextButton: NextButtonComponent,
    },
}



