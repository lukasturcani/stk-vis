import { AnyAction } from '@reduxjs/toolkit'
import { IState, DatabaseBrowserKind } from '../../../models';
import { getPageMoleculesInitial } from './getPageMoleculesInitial';
import { getPageMoleculesLoaded } from './getPageMoleculesLoaded';
import { assertNever } from './utilities';


interface getPageMoleculesInterface
{
    (pageIndex: number):
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => void
}


export const getPageMolecules: getPageMoleculesInterface =
    (pageIndex: number) =>
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => {

        const state: IState = getState();
        switch (state.kind) {

            case DatabaseBrowserKind.Initial:
                getPageMoleculesInitial(pageIndex, dispatch, state);
                break;

            case DatabaseBrowserKind.Loaded:
                getPageMoleculesLoaded(pageIndex, dispatch, state);
                break;

            default:
                assertNever(state);
                break;
        }
}
