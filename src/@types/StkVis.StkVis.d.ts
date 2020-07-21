declare module 'StkVis.StkVis'
{
    import {
        IProps as IConfiguratorProps,
    } from 'MongoConfigurator.MongoConfigurator';
    import { IAction } from 'StkVis.Action';

    export type IStkVis = Record<string, unknown>;

    export interface IProps
    {
        value0: IConfiguratorProps;
    }

    export const initialState: IStkVis;

    export const reducer:
        (state: IStkVis) => (action: IAction) => IStkVis;

    export const props:
        (state: IStkVis) => IProps;
}
