declare module 'Molecules.Molecules'

{
    import {
        Action,
    } from 'Molecules.Action';
    import {
        Mesh,
    } from 'mol-draw';
    import {
        SelectingCollection
    } from 'SelectingCollection';
    import { Molecule } from 'Molecules.Molecule';

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


    type Map = unknown;

    export interface MoleculeTableProps
    {
        value0: {
            molecules: Molecule[];
            columns: string[];
            selectedRow: number;
            rows: Map[];
        };
    }

    export type Molecules = Record<string, unknown>;
    export const initialState:
        (columns: string[]) =>
        (molecules: SelectingCollection<Molecule>) =>
        Molecules;

    export const reducer:
        (state: Molecules) =>
        (action: Action) =>
        Molecules;

    export const moleculeTableProps:
        (state: Molecules) => MoleculeTableProps;

    export const twoDViewerProps:
        (state: Molecules) => TwoDViewerProps;

    export const threeDViewerProps:
        (state: Molecules) => ThreeDViewerProps;

    export const get: (map: Map) => (key: string) => string
}
