declare module 'MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage'
{
    import {
        PageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export type UpdateMoleculePage = Record<string, unknown>;

    export const updateMoleculePage:
        (pageData: PageData) => UpdateMoleculePage;
}
