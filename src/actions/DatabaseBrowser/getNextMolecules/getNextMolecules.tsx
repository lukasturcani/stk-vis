import { AnyAction } from '@reduxjs/toolkit'
import { IState, DatabaseBrowserKind } from '../../../models';
import { getNextMoleculesInitial } from './getNextMoleculesInitial';
import { getNextMoleculesLoaded} from './getNextMoleculesLoaded';
import { assertNever } from './utilities';


export function getNextMolecules(
    dispatch: (arg: AnyAction) => void,
    getState: () => IState,
)
    : void
{

    const state: IState = getState();
    switch (state.kind) {

        case DatabaseBrowserKind.Initial:
            getNextMoleculesInitial(dispatch, state);
            break;

        case DatabaseBrowserKind.Loaded:
            getNextMoleculesLoaded(dispatch, state);
            break;

        default:
            assertNever(state);
            break;
    }
}
