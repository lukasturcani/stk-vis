declare module 'StkVis.Action'
{
    import {
        UpdateMoleculePage,
    } from 'StkVis.UpdateMoleculePage';
    import {
        SelectMolecule
    } from 'Molecules.SelectMolecule';
    import {
        SetUnsorted
    } from 'RequestManager.SetUnsorted';
    import {
        SetSorted,
    } from 'RequestManager.SetSorted';
    import {
        InitializeUnsortedAll
    } from 'MongoConfigurator.InitializeUnsortedAll';
    import {
        InitializeUnsortedBuildingBlocks
    } from 'MongoConfigurator.InitializeUnsortedBuildingBlocks';
    import {
        InitializeUnsortedConstructedMolecules
    } from 'MongoConfigurator.InitializeUnsortedConstructedMolecules';

    export interface Action
    {
        type: string;
    }

    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;

    export const setSorted:
        (payload: SetSorted) => Action;

    export const setUnsorted:
        (payload: SetUnsorted) => Action;

    export const selectMolecule:
        (payload: SelectMolecule) => Action;

    export const initializeUnsortedAll:
        (payload: InitializeUnsortedAll) => Action;

    export const initializeUnsortedBuildingBlocks:
        (payload: InitializeUnsortedBuildingBlocks) => Action;

    export const initializeUnsortedConstructedMolecules:
        (payload: InitializeUnsortedConstructedMolecules) => Action;


}
