declare module 'MongoConfigurator.MongoConfigurator'
{
    import {
        IAction,
    } from 'MongoConfigurator.Action';

    export type IMongoConfigurator = Record<string, unknown>;

    export interface Props
    {
        value0: {
            kind: 'Mongo Configurator';
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
        };
    }

    export const initialState: IMongoConfigurator;

    export const reducer:
        (state: IMongoConfigurator) =>
        (action: IAction) =>
        IMongoConfigurator;

    export const props: (state: IMongoConfigurator) => Props;
}
