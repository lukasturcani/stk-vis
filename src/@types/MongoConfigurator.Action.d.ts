declare module 'MongoConfigurator.Action'
{
    import {
        UpdateFields
    } from 'MongoConfigurator.UpdateFields.UpdateFields';
    import {
        PageData
    } from 'MoleculeBrowser.UpdateMoleculePage.PageData';
    import {
        InitializeUnsortedAll,
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll'
    import {
        InitializeUnsortedBuildingBlocks,
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks'
    import {
        InitializeUnsortedConstructedMolecules,
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules'

    export interface Action
    {
        type: string;
    }

    export const updateFields:
        (payload: UpdateFields) => Action;

    export const initializeUnsortedAll:
        (payload: InitializeUnsortedAll) => Action;

    export const initializeUnsortedBuildingBlocks:
        (payload: InitializeUnsortedBuildingBlocks) => Action;

    export const initializeUnsortedConstructedMolecules:
        (payload: InitializeUnsortedConstructedMolecules) => Action;
}
