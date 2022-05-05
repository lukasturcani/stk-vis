declare module 'Page.MongoConfigurator'
{
    import { SortType } from 'SortType';
    import { Molecule } from 'Molecule';
    import * as Config from 'Config';

    export type Model = Record<string, unknown>;
    export type Action = { type: string; };
    export const reducer: (model: Model) => (action: Action) => Model;
    export const init: Model;

    export const doNothing: Action;

    export interface ActionCreators<a>
    {
        initUnsortedAll: (payload: Config.UnsortedAll) => a;

        initUnsortedBuildingBlocks:
            (payload: Config.UnsortedBuildingBlocks) => a;

        initUnsortedConstructedMolecules:
            (payload: Config.UnsortedConstructedMolecules) => a;
    }

    export const props:
        <a>(actionCreators: ActionCreators<a>) =>
        (model: Model) =>
        Props<a>;

    export interface Props<a>
    {
        url: string;
        database: string;
        moleculeKey: string;
        moleculeCollection: string;
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        numEntriesPerPage: number;
        ignoredCollections: string[];
        selectBuildingBlocks: boolean;
        selectConstructedMolecules: boolean;
        getMoleculesButton: GetMoleculesButtonProps<a>;
        twoDViewer: boolean;
        threeDViewer: boolean;
        type: "Mongo Configurator";
    }

    export interface GetMoleculesButtonProps<a>
    {
        onClick:
            () =>
            (dispatch: (action: a) => void) =>
            (snackbars: Snackbars) =>
            (mongoData: MongoData) =>
            Promise<void>
    }

    export interface Snackbars
    {
        success: Snackbar;
        error: Snackbar;
    }

    export interface Snackbar
    {
        setOpen: (open: boolean) => void;
        setMessage: (message: string) => void;
    }

    export interface MongoData
    {
        url: string;
        database: string;
        moleculeKey: string;
        moleculeCollection: string;
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        numEntriesPerPage: number;
        selectBuildingBlocks: boolean;
        selectConstructedMolecules: boolean;
        twoDViewer: boolean;
        threeDViewer: boolean;
    }

}
