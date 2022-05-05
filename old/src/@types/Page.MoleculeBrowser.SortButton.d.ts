declare module 'Page.MoleculeBrowser.SortButton'
{
    import { SortType } from 'SortType';
    import { Snackbar } from 'Snackbar';

    export interface Props<a>
    {
        collections: string[];

        setSorted:
            () =>
            (dispatch: (action: a) => void) =>
            (snackbar: Snackbar) =>
            (collection: string) =>
            (sortType: SortType) =>
            Promise<void>;

        setUnsorted:
            () =>
            (dispatch: (action: a) => void) =>
            (snackbar: Snackbar) =>
            Promise<void>;
    }
}
