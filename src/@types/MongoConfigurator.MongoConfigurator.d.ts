declare module 'MongoConfigurator.MongoConfigurator'
{
    import {
        Action,
    } from 'MongoConfigurator.Action';

    export type MongoConfigurator = Record<string, unknown>;

    export interface Props
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
        };
    }

    export const initialState: MongoConfigurator;

    export const reducer:
        (state: MongoConfigurator) =>
        (action: Action) =>
        MongoConfigurator;

    export const props: (state: MongoConfigurator) => Props;
}
