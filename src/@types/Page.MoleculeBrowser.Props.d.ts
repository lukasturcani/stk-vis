declare module 'Page.MoleculeBrowser.Props'
{
    import {
        Props as SortButtonProps,
    } from 'Page.MoleculeBrowser.SortButton';
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
        Props as NextButtonProps,
    } from 'Page.MoleculeBrowser.NextButton';
    import {
        Props as BackButtonProps,
    } from 'Page.MoleculeBrowser.BackButton';
    import {
        Props as BreadcrumbsProps,
    } from 'Page.MoleculeBrowser.Breadcrumbs';
    import {
        Props as ViewerSwitchProps,
    } from 'Page.ViewerSwitch'
    import {
        Props as SaveButtonProps,
    } from 'Page.SaveButton';

    export interface AllViewers<a>
    {
        value0: {
            sortButton: SortButtonProps<a>;
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: TwoDViewerProps;
            threeDViewer: ThreeDViewerProps;
            nextButton: NextButtonProps<a>;
            backButton: BackButtonProps<a>;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            type: "Molecule Browser All Viewers";
        };
        type: undefined;
    }
    export interface TwoDViewer<a>
    {
        value0: {
            sortButton: SortButtonProps<a>;
            moleculeTable: MoleculeTableProps<a>;
            threeDViewer: undefined;
            twoDViewer: TwoDViewerProps;
            nextButton: NextButtonProps<a>;
            backButton: BackButtonProps<a>;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            type: "Molecule Browser 2D Viewer";
        };
        type: undefined;
    }
    export interface ThreeDViewer<a>
    {
        value0: {
            sortButton: SortButtonProps<a>;
            moleculeTable: MoleculeTableProps<a>;
            twoDViewer: undefined;
            threeDViewer: ThreeDViewerProps;
            nextButton: NextButtonProps<a>;
            backButton: BackButtonProps<a>;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            type: "Molecule Browser 3D Viewer";
        }
        type: undefined;
    }
    export interface NoViewers<a>
    {
        value0: {
            sortButton: SortButtonProps<a>;
            moleculeTable: MoleculeTableProps<a>;
            nextButton: NextButtonProps<a>;
            backButton: BackButtonProps<a>;
            breadcrumbs: BreadcrumbsProps<a>;
            twoDViewerSwitch: ViewerSwitchProps<a>;
            threeDViewerSwitch: ViewerSwitchProps<a>;
            saveButton: SaveButtonProps;
            type: "Molecule Browser No Viewers";
        };
        type: undefined;
    }

    export type Props<a>
        = AllViewers<a>
        | TwoDViewer<a>
        | ThreeDViewer<a>
        | NoViewers<a>
}
