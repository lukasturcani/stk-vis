declare module 'MongoConfigurator.Action'
{
    import {
        UpdateFields
    } from 'MongoConfigurator.UpdateFields.UpdateFields';
    import {
        PageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';

    export interface Action
    {
        type: string;
    }

    export const updateFields:
        (payload: UpdateFields) => Action;
}
