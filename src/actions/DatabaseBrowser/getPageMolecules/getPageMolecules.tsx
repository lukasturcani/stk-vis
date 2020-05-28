import { AnyAction } from '@reduxjs/toolkit'
import { IState, DatabaseBrowserKind } from '../../../models';
import { getPageMoleculesInitial } from './getPageMoleculesInitial';
import { getPageMoleculesLoaded } from './getPageMoleculesLoaded';
import { assertNever } from './utilities';


interface getPageMoleculesInterface
{
    (
        pageIndex: number,
        successSnackbar: (message: string) => void
    ):
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => void
}


export const getPageMolecules: getPageMoleculesInterface =
    (
        pageIndex: number,
        successSnackbar: (message: string) => void,
    ) =>
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => {

        const state: IState = getState();
        switch (state.kind) {

            case DatabaseBrowserKind.Initial:
                getPageMoleculesInitial(
                    pageIndex,
                    successSnackbar,
                    dispatch,
                    state,
                );
                break;

            case DatabaseBrowserKind.Loaded:
                getPageMoleculesLoaded(
                    pageIndex,
                    successSnackbar,
                    dispatch,
                    state,
                );
                break;

            default:
                assertNever(state);
                break;
        }
}
