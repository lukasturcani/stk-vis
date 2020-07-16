declare module 'StkVis.Action'
{
    import {
        IMongoData
    } from 'MongoConfigurator.UpdateFields.MongoData';

    export interface IAction
    {
        type: string;
    }

    export const updateFields:
        (mongoData: IMongoData) => IAction;
}
