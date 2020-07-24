declare module 'RequestManager.RequestManager'

{
    import {
        IAction,
    } from 'RequestManager.Action';

    export type IRequestManager = Record<string, unknown>;

    export interface BackButtonProps
    {
        value0: {
            disabled: boolean;
        };
    }

    export type NextButtonProps = Record<string, unknown>;
    export type SortButtonProps = Record<string, unknown>;

    export const initialState: IRequestManager;

    export const reducer:
        (state: IRequestManager) =>
        (action: IAction) =>
        IRequestManager;

    export const nextButtonProps:
        (state: IRequestManager) => NextButtonProps;

    export const backButtonProps:
        (state: IRequestManager) => BackButtonProps;

    export const sortButtonProps:
        (state: IRequestManager) => SortButtonProps;
}
