declare module 'Page.MoleculeTable'
{
    import { Snackbar } from 'Snackbar';
    import { Molecule } from 'Molecule';

    type Map = unknown;

    export interface Props<a>
    {
        columns: string[];
        selectedRow: number;
        rows: Map[];
        molecules: Molecule[];
        selectMolecule:
            (dispatch: (action: a) => void) =>
            (rowIndex: number) =>
            (molecule: Molecule) =>
            void;
        buildingBlockRequests:
            () =>
            Array<
                (dispatch: (action: a) => void) =>
                (snackbar: Snackbar) =>
                Promise<void>
            >;
    }

    export const get: (map: Map) => (key: string) => string;
}
