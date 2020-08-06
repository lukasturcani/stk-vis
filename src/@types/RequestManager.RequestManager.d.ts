declare module 'RequestManager.RequestManager'

{
    import {
        Action,
    } from 'RequestManager.Action';
    import {
        RequestResult,
    } from 'RequestManager.RequestResult';

    export type RequestManager = Record<string, unknown>;

    type Dispatch<a> = (action: a) => void;
    export interface BackButtonProps
    {
        value0: {
            disabled: boolean;
            request: () => Promise<RequestResult>;
            onClick: <a>() => (dispatch: Dispatch<a>) => Promise<void>;
        };
    }

    export interface SortButtonProps
    {
        value0: {
            collections: string[];
        };
    }

    export interface NextButtonProps
    {
        value0: {
            lastPage: boolean;
            request: () => Promise<RequestResult>;
        };
    }

    export const initialState: RequestManager;

    export const reducer:
        (state: RequestManager) =>
        (action: Action) =>
        RequestManager;

    export const nextButtonProps:
        (state: RequestManager) => NextButtonProps;

    export const backButtonProps:
        (state: RequestManager) => BackButtonProps;

    export const sortButtonProps:
        (state: RequestManager) => SortButtonProps;
}
