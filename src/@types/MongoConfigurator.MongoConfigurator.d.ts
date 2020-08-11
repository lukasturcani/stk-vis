declare module 'MongoConfigurator.MongoConfigurator'
{
    import {
        Action,
    } from 'MongoConfigurator.Action';
    import {
        InitializeUnsortedAll
    } from 'MoleculeBrowser.Initialize.UnsortedAll';
    import {
        InitializeUnsortedBuildingBlocks
    } from 'MoleculeBrowser.Initialize.UnsortedBuildingBlocks';
    import {
        InitializeUnsortedConstructedMolecules
    } from 'MoleculeBrowser.Initialize.UnsortedConstructedMolecules';

    export type MongoConfigurator = Record<string, unknown>;


    export interface MongoData
    {
        url: string;
        moleculeKey: string;
        database: string;
        moleculeCollection: string
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        numEntriesPerPage: number;
        selectBuildingBlocks: boolean;
        selectConstructedMolecules: boolean;
    }

    export interface GetMoleculesButtonProps<a>
    {
        value0: {
            onClick:
                () =>
                (dispatch: (action: a) => void) =>
                (snackbars: Snackbars) =>
                (data: MongoData) =>
                Promise<void>;
        }
    }

    export interface Snackbar
    {
        setOpen: (open: boolean) => void;
        setMessage: (message: string) => void;
    }

    export interface Snackbars
    {
        success: Snackbar;
        error: Snackbar;
    }

    export interface Props<a>
    {
        value0: {
            type: "Mongo Configurator";
            url: string;
            moleculeKey: string;
            database: string;
            moleculeCollection: string;
            constructedMoleculeCollection: string;
            positionMatrixCollection: string;
            buildingBlockPositionMatrixCollection: string;
            numEntriesPerPage: number;
            selectBuildingBlocks: boolean;
            selectConstructedMolecules: boolean;
            getMoleculesButton: GetMoleculesButtonProps<a>;
        };
    }

    export const initialState: MongoConfigurator;

    export const reducer:
        (state: MongoConfigurator) =>
        (action: Action) =>
        MongoConfigurator;

    export interface ActionCreators<a>
    {
        initializeUnsortedAll:
            (payload: InitializeUnsortedAll) => a;

        initializeUnsortedBuildingBlocks:
            (payload: InitializeUnsortedBuildingBlocks) => a;

        initializeUnsortedConstructedMolecules:
            (payload: InitializeUnsortedConstructedMolecules) => a;
    }

    export const props:
        <a>(creatos: ActionCreators<a>) =>
        (state: MongoConfigurator) =>
        Props<a>;
}
