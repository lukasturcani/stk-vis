declare module 'Molecules.Molecules'

{
    import {
        Action,
    } from 'Molecules.Action';
    import {
        SelectMolecule,
    } from 'Molecules.SelectMolecule';
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

    export interface MoleculeTableProps<a>
    {
        value0: {
            molecules: Molecule[];
            columns: string[];
            selectedRow: number;
            rows: Map[];
            selectMolecule:
                (dispatch: (action: a) => void) =>
                (id: number) =>
                (molecule: Molecule) =>
                void;
        };
    }

    export interface ActionCreators<a>
    {
        selectMolecule: (payload: SelectMolecule) => a;
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
        <a>(actionCreators: ActionCreators<a>) =>
        (state: Molecules) =>
        MoleculeTableProps<a>;

    export const twoDViewerProps:
        (state: Molecules) => TwoDViewerProps;

    export const threeDViewerProps:
        (state: Molecules) => ThreeDViewerProps;

    export const get: (map: Map) => (key: string) => string
}
