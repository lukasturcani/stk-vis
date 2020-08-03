declare module 'Molecules.SelectMolecule'
{
    import { Molecule } from 'Molecules.Molecule';
    type SelectMolecule = Record<string, unknown>;
    const selectMolecule:
        (select: number) => (molecule: Molecule) => SelectMolecule;
}
