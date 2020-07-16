declare module 'StkVis.StkVis'
{
    import { IAction } from 'StkVis.Action';

    export type IStkVis  = Record<string, unknown>;
    export type IProps = Record<string, unknown>;

    export const initialState: IStkVis;

    export const reducer:
        (state: IStkVis) => (action: IAction) => IStkVis;

    export const props:
        (state: IStkVis) => IProps;
}
