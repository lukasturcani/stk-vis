declare module 'MongoConfigurator.MongoConfigurator'
{
    export type IMongoConfigurator = Record<string, unknown>;
    export interface IProps
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
}
