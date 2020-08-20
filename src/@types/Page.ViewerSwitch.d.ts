declare module 'Page.ViewerSwitch'
{
    export interface Props<a>
    {
        label: string;
        state: boolean;
        setState:
            (dispatch: (action: a) => void) =>
            (state: boolean) =>
            void;
    }
}
