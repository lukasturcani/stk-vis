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

    export interface AllViewers<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
        twoDViewer: TwoDViewerProps;
        threeDViewer: ThreeDViewerProps;
        nextButton: NextButtonProps<a>;
        backButton: BackButtonProps<a>;
        breadcrumbs: BreadcrumbsProps<a>;
        type: "Molecule Browser All Viewers";
    }
    export interface TwoDViewer<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
        twoDViewer: TwoDViewerProps;
        nextButton: NextButtonProps<a>;
        backButton: BackButtonProps<a>;
        breadcrumbs: BreadcrumbsProps<a>;
        type: "Molecule Browser 2D Viewer";
    }
    export interface ThreeDViewer<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
        threeDViewer: ThreeDViewerProps;
        nextButton: NextButtonProps<a>;
        backButton: BackButtonProps<a>;
        breadcrumbs: BreadcrumbsProps<a>;
        type: "Molecule Browser 3D Viewer";
    }
    export interface NoViewers<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
        nextButton: NextButtonProps<a>;
        backButton: BackButtonProps<a>;
        breadcrumbs: BreadcrumbsProps<a>;
        type: "Molecule Browser No Viewers";
    }

    export type Props<a>
        = AllViewers<a>
        | TwoDViewer<a>
        | ThreeDViewer<a>
        | NoViewers<a>
}
