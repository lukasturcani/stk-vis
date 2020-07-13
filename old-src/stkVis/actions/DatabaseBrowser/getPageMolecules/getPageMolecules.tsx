import { AnyAction } from '@reduxjs/toolkit'
import { IState } from '../../../models';
import { sendMoleculeRequest } from '../../../actions';
import {
    isRequestSent,
} from './utilities';


export interface getPageMoleculesOptions
{
    pageIndex: number;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}


export function getPageMolecules(
    options: getPageMoleculesOptions,
)
    : (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ) => void
{
    return (
        dispatch: (arg: AnyAction) => void,
        getState: () => IState,
    ): void =>
    {
        const state: IState = getState();

        if (!isRequestSent(state))
        {
            dispatch(sendMoleculeRequest());
        }
    };
}
