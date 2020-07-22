declare module 'StkVis.Action'
{
    import {
        IMongoData
    } from 'MongoConfigurator.UpdateFields.MongoData';
    import {
        IPageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export interface IAction
    {
        type: string;
    }

    export const updateFields:
        (mongoData: IMongoData) => IAction;

    export const updateMoleculePage:
        (pageData: IPageData) => IAction;
}
