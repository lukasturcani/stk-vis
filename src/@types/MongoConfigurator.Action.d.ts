declare module 'MongoConfigurator.Action'
{
    import {
        IUpdateFields
    } from 'MongoConfigurator.UpdateFields.UpdateFields';
    import {
        IPageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export interface IAction
    {
        type: string;
    }

    export const updateFields:
        (updateFields: IUpdateFields) => IAction;
}
