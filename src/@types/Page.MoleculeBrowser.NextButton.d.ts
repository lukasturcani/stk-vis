declare module 'Page.MoleculeBrowser.NextButton'
{


    export interface Props<a>
    {
        lastPage: boolean;
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
