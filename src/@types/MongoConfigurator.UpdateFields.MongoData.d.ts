declare module 'MongoConfigurator.UpdateFields.MongoData'
{
    import { SearchKind } from 'MongoConfigurator.SearchKind';

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
        searchKind: SearchKind;
    }
}
