declare module 'MongoConfigurator.MongoConfigurator'
{
    import {
        Action,
    } from 'MongoConfigurator.Action';
    import {
        InitializeUnsortedAll
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedAll';
    import {
        InitializeUnsortedBuildingBlocks
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedBuildingBlocks';
    import {
        InitializeUnsortedConstructedMolecules
    } from 'MongoConfigurator.InitializeMoleculeBrowser.UnsortedConstructedMolecules';

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
                (data: MongoData) =>
                Promise<void>;
        }
    }

    export interface Props<a>
    {
        value0: {
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
