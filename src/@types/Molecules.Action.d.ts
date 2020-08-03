declare module 'Molecules.Action'
{
    import { SelectMolecule } from 'Molecules.SelectMolecule';

    export interface Action
    {
        type: string;
    }

    export const selectMolecule:
        (select: SelectMolecule) => Action;

}
