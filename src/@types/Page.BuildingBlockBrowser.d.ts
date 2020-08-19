declare module 'Page.BuildingBlockBrowser'
{
    import {
        Props as MoleculeTableProps,
    } from 'Page.MoleculeBrowser.MoleculeTable';
    import {
        Props as TwoDViewerProps,
    } from 'Page.MoleculeBrowser.TwoDViewer';
    import {
        Props as ThreeDViewerProps,
    } from 'Page.MoleculeBrowser.ThreeDViewer';

    export type Model = unknown;
    export type Action = { type: string };

    export interface Props<a>
    {
        moleculeTable: MoleculeTableProps<a>;
        twoDViewer: TwoDViewerProps;
        threeDViewer: ThreeDViewerProps;
        breadcrumbs: BreadcrumbsProps<a>;
        type: "Building Block Browser";
    }

    export interface BreadcrumbsProps<a>
    {
        mongoDbClick: (dispatch: (action: a) => void) => void;
        resultsClick: (dispatch: (action: a) => void) => void;
        historyClick:
            () =>
            Array<(dispatch: (action: a) => void) => Promise<void>>
    }
}
