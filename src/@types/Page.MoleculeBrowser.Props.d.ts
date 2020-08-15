declare module 'Page.MoleculeBrowser.Props'
{
    import {
        Props as SortButtonProps,
    } from 'Page.MoleculeBrowser.SortButton';
    import {
        Props as MoleculeTableProps,
    } from 'Page.MoleculeBrowser.MoleculeTable';

    export interface Props<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
    }
}
