import { AnyAction } from '@reduxjs/toolkit'
import { IState, DatabaseBrowserKind } from '../../../models';
import { getPageMoleculesInitial } from './getPageMoleculesInitial';
import { getPageMoleculesLoaded} from './getPageMoleculesLoaded';
import { assertNever } from './utilities';


export function getPageMolecules(
    dispatch: (arg: AnyAction) => void,
    getState: () => IState,
)
    : void
{

    const state: IState = getState();
    switch (state.kind) {

        case DatabaseBrowserKind.Initial:
            getPageMoleculesInitial(dispatch, state);
            break;

        case DatabaseBrowserKind.Loaded:
            getPageMoleculesLoaded(dispatch, state);
            break;

        default:
            assertNever(state);
            break;
    }
}
