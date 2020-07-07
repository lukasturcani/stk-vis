import { DatabaseBrowserKind } from '../DatabaseBrowserKind';
import { IInitialRequestState } from './IInitialRequestState';
import { SearchKind } from '../SearchKind';


export interface IInitialDatabaseBrowser {
    readonly kind: DatabaseBrowserKind.Initial;
    readonly searchKind:
        SearchKind.UnsortedBoth
        | SearchKind.UnsortedBuildingBlocks
        | SearchKind.UnsortedConstructedMolecules;
    readonly url: string;
    readonly moleculeKey: string;
    readonly database: string;
    readonly moleculeCollection: string;
    readonly constructedMoleculeCollection: string;
    readonly positionMatrixCollection: string;
    readonly buildingBlockPositionMatrixCollection: string;
    readonly propertyCollections: string[];
    readonly initialRequestState: IInitialRequestState;
    readonly numEntriesPerPage: number;
}
