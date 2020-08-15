declare module 'Page.MoleculeBrowser.MoleculeTable'
{
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
    }

    export const get: (map: Map) => (key: string) => string;
}
