declare module 'MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage'
{
    import {
        IPageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export type IUpdateMoleculePage = Record<string, unknown>;

    export const updateMoleculePage:
        (pageData: IPageData) => IUpdateMoleculePage;
}
