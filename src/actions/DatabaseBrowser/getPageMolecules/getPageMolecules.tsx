import { AnyAction } from '@reduxjs/toolkit'
import { IState, DatabaseBrowserKind } from '../../../models';
import { getPageMoleculesInitial } from './getPageMoleculesInitial';
import { getPageMoleculesLoaded } from './getPageMoleculesLoaded';
import { assertNever } from './utilities';


export interface getPageMoleculesOptions
{
    pageIndex: number;
    successSnackbar: (message: string) => void;
    failureSnackbar: (message: string) => void;
}


interface getPageMoleculesInterface
{
    (options: getPageMoleculesOptions):
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => void
}


export const getPageMolecules: getPageMoleculesInterface =
    (options: getPageMoleculesOptions) =>
    (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => {

        const state: IState = getState();
        switch (state.kind) {

            case DatabaseBrowserKind.Initial:
                getPageMoleculesInitial({
                    ...options,
                    dispatch,
                    state,
                });
                break;

            case DatabaseBrowserKind.Loaded:
                getPageMoleculesLoaded({
                    ...options,
                    dispatch,
                    state,
                });
                break;

            default:
                assertNever(state);
                break;
        }
}
