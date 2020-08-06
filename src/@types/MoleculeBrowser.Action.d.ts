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

    export interface Action
    {
        type: string;
    }

    export const updateMoleculePage:
        (payload: UpdateMoleculePage) => Action;

    export const setSorted_:
        (collection: string) => (sortType: SortType) => Action

    export const setUnsorted_: Action;

    export const selectMolecule_:
        (id: number) => (molecule: Molecule) => Action;
}
