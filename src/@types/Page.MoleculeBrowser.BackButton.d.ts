declare module 'Page.MoleculeBrowser.BackButton'
{

    export interface Props<a>
    {
        disabled: boolean;
        onClick:
            () =>
            (dispatch: (action: a) => void) =>
            (snackbars: Snackbars) =>
            Promise<void>;
    }

    export interface Snackbars
    {
        success: Snackbar;
        error: Snackbar;
    }

    export interface Snackbar
    {
        setOpen: (open: boolean) => void;
        setMessage: (message: string) => void;
    }
}
