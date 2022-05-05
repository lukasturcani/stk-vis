declare module 'Page.MoleculeBrowser.Breadcrumbs'
{
    export interface Props<a>
    {
        onClick: (dispatch: (action: a) => void) => void
    }
}
