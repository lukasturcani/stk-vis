import { DatabaseBrowserKind } from './DatabaseBrowserKind';
import { IInitialRequestState } from '../IInitialRequestState';


export interface IInitialDatabaseBrowser {
    readonly kind: DatabaseBrowserKind.Initial;
    readonly url: string;
    readonly database: string;
    readonly moleculeCollection: string;
    readonly constructedMoleculeCollection: string;
    readonly positionMatrixCollection: string;
    readonly buildingBlockPositionMatrixCollection: string;
    readonly propertyCollections: string[];
    readonly initialRequestState: IInitialRequestState;
    readonly numEntriesPerPage: number;
}
