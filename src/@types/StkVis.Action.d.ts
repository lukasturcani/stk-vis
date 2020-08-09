declare module 'StkVis.Action'
{
    import {
        UpdateMoleculePage,
    } from 'StkVis.UpdateMoleculePage';

    export interface Action
    {
        type: string;
    }

    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;

    export const

}
