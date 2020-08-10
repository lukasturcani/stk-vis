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
    import {
        SelectMolecule,
    } from 'Molecules.SelectMolecule';
    import {
        SetSorted,
    } from 'RequestManager.SetSorted';
    import {
        SetUnsorted,
    } from 'RequestManager.SetUnsorted';

    export type MoleculeBrowser = Record<string, unknown>;

    export interface BreadcrumbsProps<a>
    {
        value0: {
            onClick: (dispatch: (action: a) => void) => void,
        }
    }

    export interface Props<a>
    {
        value0: {
            type: "Molecule Browser";
            breadcrumbs: BreadcrumbsProps<a>,
            sortButton: SortButtonProps<a>,
            moleculeTable: MoleculeTableProps<a>,
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
        setSorted: (payload: SetSorted) => a;
        setUnsorted: (payload: SetUnsorted) => a;
        selectMolecule: (payload: SelectMolecule) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (state: MoleculeBrowser) =>
        Props<a>;
}
