import { DatabaseBrowserKind } from '../DatabaseBrowserKind';


export interface IInitialDatabaseBrowser {
    kind: DatabaseBrowserKind.Initial;
    searchKind: SearchKind;
    url: string;
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    propertyCollections: string[];
    requestState: IRequestState;
    numEntriesPerPage: number;
}



export const enum SearchKind
{
    UnsortedBoth = "Unsorted Both",
    UnsortedBuildingBlocks = "Unsorted Building Blocks",
    UnsortedConstructedMolecules = "Unsorted Constructed Molecules",
}
