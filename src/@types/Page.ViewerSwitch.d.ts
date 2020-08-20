declare module 'Page.ViewerSwitch'
{
    export interface Props<a>
    {
        state: boolean;
        setState:
            (dispatch: (action: a) => void) =>
            (state: boolean) =>
            void;
    }
}
