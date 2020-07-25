declare module 'MoleculeBrowser.MoleculeBrowser'

{
    import {
        Action,
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

    export type MoleculeBrowser = Record<string, unknown>;

    export interface Props
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

    export const initialState: MoleculeBrowser;

    export const reducer:
        (state: MoleculeBrowser) =>
        (action: Action) =>
        MoleculeBrowser;

    export const props: (state: MoleculeBrowser) => Props;
}
