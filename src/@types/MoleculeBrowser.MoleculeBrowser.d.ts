declare module 'MoleculeBrowser.MoleculeBrowser'

{
    import {
        IAction,
    } from 'MoleculeBrowser.Action';
    import {
        ThreeDViewerProps,
        TwoDViewerProps,
        MoleculeTableProps,
    } from 'Molecules.Molecules';
    import {
        SortButtonProps,
        NextButtonProps,
        BackButtonProps,
    } from 'RequestManager.RequestManager';

    export type IMoleculeBrowser = Record<string, unknown>;

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
