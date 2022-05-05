declare module 'Page.ColumnButton'
{
    export interface CollectionCheckboxProps
    {
        isChecked: boolean;
        label: string;
    }

    export interface Props<a>
    {
        collections: CollectionCheckboxProps[];

        hideCollection:
            (dispatch: (action: a) => void) =>
            (collection: string) =>
            void;

        showCollection:
            (dispatch: (action: a) => void) =>
            (collection: string) =>
            void;
    }
}
