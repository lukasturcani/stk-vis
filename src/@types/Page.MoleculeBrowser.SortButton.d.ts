declare module 'Page.MoleculeBrowser.SortButton'
{
    import { SortType } from 'SortType';

    export interface Props<a>
    {
        collections: string[];

        setSorted:
            () =>
            (dispatch: (action: a) => void) =>
            (collection: string) =>
            (sortType: SortType) =>
            Promise<void>;

        setUnsorted:
            () =>
            (dispatch: (action: a) => void) =>
            Promise<void>;
    }
}
