declare module 'MongoConfigurator.UpdateFields.UpdateFields'
{
    import {
        MongoData,
    } from 'MongoConfigurator.UpdateFields.MongoData';

    export type UpdateFields = Record<string, unknown>;

    export const updateFields:
        (mongoData: MongoData) => UpdateFields;
}
