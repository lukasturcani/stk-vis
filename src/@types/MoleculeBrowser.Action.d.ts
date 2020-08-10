declare module 'MoleculeBrowser.Action'
{
    import {
        UpdateMoleculePage
    } from 'MoleculeBrowser.UpdateMoleculePage';
    import {
        SortType,
    } from 'RequestManager.SortType';
    import {
        Molecule,
    } from 'Molecules.Molecule';
    import {
        SelectMolecule,
    } from 'Molecules.SelectMolecule';
    import { SetSorted } from 'RequestManager.SetSorted';
    import { SetUnsorted } from 'RequestManager.SetUnsorted';
    import {
        InitializeMongoConfigurator
    } from 'RequestManager.InitializeMongoConfigurator';

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

    export const initializeMongoConfigurator:
        (payload: InitializeMongoConfigurator) => Action;
}
