declare module 'RequestManager.Action'
{
    export interface Action
    {
        type: string;
    }

    import {
        InitializeUnsortedAll,
    } from 'RequestManager.InitializeUnsortedAll';

    import {
        InitializeUnsortedBuildingBlocks,
    } from 'RequestManager.InitializeUnsortedBuildingBlocks';

    import {
        InitializeUnsortedConstructedMolecules,
    } from 'RequestManager.InitializeUnsortedConstructedMolecules';

    import {
        SetSorted,
    } from 'RequestManager.SetSorted';

    import {
        SetUnsorted,
    } from 'RequestManager.SetUnsorted';

    import {
        UpdateMoleculePage,
    } from 'RequestManager.UpdateMoleculePage';

    export const initializeUnsortedAll:
        (payload: InitializeUnsortedAll) => Action;

    export const initializeUnsortedBuildingBlocks:
        (payload: InitializeUnsortedBuildingBlocks) => Action;

    export const initializeUnsortedConstructedMolecules:
        (payload: InitializeUnsortedConstructedMolecules) => Action;

    export const setUnsorted:
        (payload: SetUnsorted) => Action;

    export const setSorted:
        (payload: SetSorted) => Action;

    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;

}
