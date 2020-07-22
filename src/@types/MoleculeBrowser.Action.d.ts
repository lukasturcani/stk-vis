declare module 'MoleculeBrowser.Action'
{
    import {
        IUpdateMoleculePage
    } from 'MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage';

    export interface IAction
    {
        type: string;
    }

    export const updateMoleculePage:
        (payload: IUpdateMoleculePage) => IAction;
}
