declare module 'MoleculeBrowser.MoleculeBrowser'

{
    import {
        IAction,
    } from 'MoleculeBrowser.Action';

    export type IMoleculeBrowser = Record<string, unknown>;

    export type SortButtonProps = Record<string, unknown>;
    export type MoleculeTableProps = Record<string, unknown>;
    export type TwoDViewerProps = Record<string, unknown>;
    export type ThreeDViewerProps = Record<string, unknown>;
    export type BackButtonProps = Record<string, unknown>;
    export type NextButtonProps = Record<string, unknown>;


    export interface MoleculeBrowserProps
    {
        value0: {
            sortButton: SortButtonProps,
            moleculeTable: MoleculeTableProps,
            twoDViewer: TwoDViewerProps,
            threeDViewer: ThreeDViewerProps,
            backButton: BackButtonProps,
            nextButton: NextButtonProps,
        };
    }

    export const initialState: IMoleculeBrowser;

    export const reducer:
        (state: IMoleculeBrowser) =>
        (action: IAction) =>
        IMoleculeBrowser;

    export const props:
        (state: IMoleculeBrowser) => MoleculeBrowserProps;
}
