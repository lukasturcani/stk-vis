import { DatabaseBrowserKind } from './DatabaseBrowserKind';
import { IInitialRequestState } from '../IInitialRequestState';
import { IMoleculeSelectionType } from '../IMoleculeSelectionType';


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
    readonly moleculeSelectionType: IMoleculeSelectionType;
}
