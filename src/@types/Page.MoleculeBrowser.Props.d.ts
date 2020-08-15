declare module 'Page.MoleculeBrowser.Props'
{
    import {
        Props as SortButtonProps,
    } from 'Page.MoleculeBrowser.SortButton';

    export interface Props<a>
    {
        sortButton: SortButtonProps<a>;
    }
}
