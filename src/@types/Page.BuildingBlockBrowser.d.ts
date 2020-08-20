declare module 'Page.BuildingBlockBrowser'
{
    import { Snackbar } from 'Snackbar';
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

    export interface AllViewers<a>
    {
        value0: {
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: TwoDViewerProps;
            threeDViewer: ThreeDViewerProps;
            breadcrumbs: BreadcrumbsProps<a>;
            type: "Building Block Browser All Viewers";
        };
        type: undefined;
    }

    export interface TwoDViewer<a>
    {
        value0: {
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: TwoDViewerProps;
            threeDViewer: undefined;
            breadcrumbs: BreadcrumbsProps<a>;
            type: "Building Block Browser 2D Viewer";
        };
        type: undefined;
    }

    export interface ThreeDViewer<a>
    {
        value0: {
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: undefined;
            threeDViewer: ThreeDViewerProps;
            breadcrumbs: BreadcrumbsProps<a>;
            type: "Building Block Browser 3D Viewer";
        };
        type: undefined;
    }

    export interface NoViewers<a>
    {
        value0: {
            moleculeTable: MoleculeTableProps<a>;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewer: undefined;
            threeDViewer: undefined;
            type: "Building Block Browser No Viewers";
        };
        type: undefined;
    }

    export type Props<a>
        = AllViewers<a>
        | TwoDViewer<a>
        | ThreeDViewer<a>
        | NoViewers<a>;

    export interface BreadcrumbsProps<a>
    {
        mongoDbClick: (dispatch: (action: a) => void) => void;
        resultsClick: (dispatch: (action: a) => void) => void;
        historyClick:
            () =>
            Array<
                (dispatch: (action: a) => void) =>
                (snackbar: Snackbar) =>
                Promise<void>
            >
    }
}
