declare module 'Molecules.Molecules'

{
    import {
        IAction,
    } from 'Molecules.Action';

    export type IMolecules = Record<string, unknown>;
    export const initialState: IMolecules;

    export const reducer:
        (state: IMolecules) =>
        (action: IAction) =>
        IMolecules;
}
