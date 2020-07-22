declare module 'MongoConfigurator.Action'
{
    import {
        IUpdateFields
    } from 'MongoConfigurator.UpdateFields.UpdateFields';

    export interface IAction
    {
        type: string;
    }

    export const updateFields:
        (updateFields: IUpdateFields) => IAction;
}
