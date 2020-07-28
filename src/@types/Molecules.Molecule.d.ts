declare module 'Molecules.Molecule'
{
    import { Map } from 'Data.Map'

    export type Molecule = Record<string, unknown>;
    export const molecule:
        (properties: Map<string, string>) => Molecule;
}
