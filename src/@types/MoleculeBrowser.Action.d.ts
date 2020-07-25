declare module 'MoleculeBrowser.Action'
{
    import {
        UpdateMoleculePage
    } from 'MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage';

    export interface Action
    {
        type: string;
    }

    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;
}
