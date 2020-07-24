declare module 'Molecules.Molecules'

{
    import {
        IAction,
    } from 'Molecules.Action';
    import {
        Mesh,
    } from 'mol-draw';

    export interface TwoDViewerProps
    {
        value0: {
            smiles: string;
        };
    }

    export interface ThreeDViewerProps
    {
        value0: {
            meshes: Mesh[];
        };
    }

    export type MoleculeTableProps = Record<string, unknown>;
    export type IMolecules = Record<string, unknown>;
    export const initialState: IMolecules;

    export const reducer:
        (state: IMolecules) =>
        (action: IAction) =>
        IMolecules;

    export const moleculeTableProps:
        (state: IMolecules) => MoleculeTableProps;

    export const twoDViewerProps:
        (state: IMolecules) => TwoDViewerProps;

    export const threeDViewerProps:
        (state: IMolecules) => ThreeDViewerProps;
}
