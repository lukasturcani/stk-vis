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
    import {
        UpdateMoleculePage,
    } from 'RequestManager.UpdateMoleculePage';

    export type MoleculeBrowser = Record<string, unknown>;

    export interface Props<a>
    {
        value0: {
            sortButton: SortButtonProps<a>,
            moleculeTable: MoleculeTableProps,
            twoDViewer: TwoDViewerProps,
            threeDViewer: ThreeDViewerProps,
            backButton: BackButtonProps<a>,
            nextButton: NextButtonProps<a>,
        };
    }

    export const initialState: MoleculeBrowser;

    export const reducer:
        (state: MoleculeBrowser) =>
        (action: Action) =>
        MoleculeBrowser;

    export interface ActionCreators<a>
    {
        updateMoleculePage: (payload: UpdateMoleculePage) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (state: MoleculeBrowser) =>
        Props<a>;
}
