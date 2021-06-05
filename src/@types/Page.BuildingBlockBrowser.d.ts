declare module 'Page.BuildingBlockBrowser'
{
    import { Snackbar } from 'Snackbar';
    import {
        Props as MoleculeTableProps,
    } from 'Page.MoleculeTable';
    import {
        Props as TwoDViewerProps,
    } from 'Page.TwoDViewer';
    import {
        Props as ThreeDViewerProps,
    } from 'Page.ThreeDViewer';
    import {
        Props as ViewerSwitchProps,
    } from 'Page.ViewerSwitch'
    import {
        Props as SaveButtonProps,
    } from 'Page.SaveButton';
    import {
        Props as ColumnButtonProps,
    } from 'Page.ColumnButton';

    export type Model = unknown;
    export type Action = { type: string };

    export interface AllViewers<a>
    {
        value0: {
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: TwoDViewerProps;
            threeDViewer: ThreeDViewerProps;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            columnButton: ColumnButtonProps<a>;
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
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            columnButton: ColumnButtonProps<a>;
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
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            columnButton: ColumnButtonProps<a>;
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
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            columnButton: ColumnButtonProps<a>;
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
