import { AnyAction } from '@reduxjs/toolkit';
import { IState } from '../../../models';


export interface Options
{
}



export function getSortedAll(
    options: Options,
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
