declare module 'MongoConfigurator.UpdateFields.UpdateFields'
{
    import {
        IMongoData,
    } from 'MongoConfigurator.UpdateFields.MongoData';

    export type IUpdateFields = Record<string, unknown>;

    export const updateFields:
        (mongoData: IMongoData) => IUpdateFields;
}
