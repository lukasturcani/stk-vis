declare module 'RequestManager.Action'
{
    export interface Action
    {
        type: string;
    }

    import {
        InitializeSortedAll,
    } from 'RequestManager.InitializeSortedAll';

    import {
        InitializeSortedBuildingBlocks,
    } from 'RequestManager.InitializeSortedBuildingBlocks';

    import {
        InitializeSortedConstructedMolecules,
    } from 'RequestManager.InitializeSortedConstructedMolecules';

    import {
        InitializeUnsortedAll,
    } from 'RequestManager.InitializeUnsortedAll';

    import {
        InitializeUnsortedBuildingBlocks,
    } from 'RequestManager.InitializeUnsortedBuildingBlocks';

    import {
        InitializeUnsortedConstructedMolecules,
    } from 'RequestManager.InitializeUnsortedConstructedMolecules';

    export const initializeUnsortedAll:
        (payload: InitializeUnsortedAll) => Action;

    export const initializeUnsortedBuildingBlocks:
        (payload: InitializeUnsortedBuildingBlocks) => Action;

    export const initializeUnsortedConstructedMolecules:
        (payload: InitializeUnsortedConstructedMolecules) => Action;

    export const initializeSortedAll:
        (payload: InitializeSortedAll) => Action;

    export const initializeSortedBuildingBlocks:
        (payload: InitializeSortedBuildingBlocks) => Action;

    export const initializeSortedConstructedMolecules:
        (payload: InitializeSortedConstructedMolecules) => Action;

}
