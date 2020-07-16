declare module 'MongoConfigurator.UpdateFields.MongoData'
{
    import { ISearchKind } from 'MongoConfigurator.SearchKind';

    export interface IMongoData
    {
        url: string;
        database: string;
        moleculeKey: string;
        moleculeCollection: string;
        constructedMoleculeCollection: string;
        positionMatrixCollection: string;
        buildingBlockPositionMatrixCollection: string;
        numEntriesPerPage: number;
        searchKind: ISearchKind;
    }
}
