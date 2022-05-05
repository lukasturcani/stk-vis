declare module 'Snackbar'
{
    export interface Snackbar
    {
        setOpen: (open: boolean) => void;
        setMessage: (message: string) => void;
    }
}
