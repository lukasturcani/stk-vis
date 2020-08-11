declare module 'MongoConfigurator.Action'
{
    import {
        InitializeUnsortedAll,
    } from 'MoleculeBrowser.Initialize.UnsortedAll'
    import {
        InitializeUnsortedBuildingBlocks,
    } from 'MoleculeBrowser.Initialize.UnsortedBuildingBlocks'
    import {
        InitializeUnsortedConstructedMolecules,
    } from 'MoleculeBrowser.Initialize.UnsortedConstructedMolecules'

    export interface Action
    {
        type: string;
    }

    export const initializeUnsortedAll:
        (payload: InitializeUnsortedAll) => Action;

    export const initializeUnsortedBuildingBlocks:
        (payload: InitializeUnsortedBuildingBlocks) => Action;

    export const initializeUnsortedConstructedMolecules:
        (payload: InitializeUnsortedConstructedMolecules) => Action;
}
