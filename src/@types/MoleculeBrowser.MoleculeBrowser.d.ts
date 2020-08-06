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
        RequestResult,
    } from 'RequestManager.RequestResult';

    export type MoleculeBrowser = Record<string, unknown>;

    export interface Props<a>
    {
        value0: {
            sortButton: SortButtonProps,
            moleculeTable: MoleculeTableProps,
            twoDViewer: TwoDViewerProps,
            threeDViewer: ThreeDViewerProps,
            backButton: BackButtonProps<a>,
            nextButton: NextButtonProps,
        };
    }

    export const initialState: MoleculeBrowser;

    export const reducer:
        (state: MoleculeBrowser) =>
        (action: Action) =>
        MoleculeBrowser;

    export interface Helpers<a>
    {
        pageRequestResultToAction: <a>(result: RequestResult) => a;
    }

    export const props:
        <a>(helpers: Helpers<a>) =>
        (state: MoleculeBrowser) =>
        Props<a>;
}
