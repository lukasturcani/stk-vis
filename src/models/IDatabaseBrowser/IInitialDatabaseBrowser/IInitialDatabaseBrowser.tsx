import { DatabaseBrowserKind } from '../DatabaseBrowserKind';
import { IInitialRequestState } from '../../IInitialRequestState';
import { MoleculeKind } from './MoleculeKind';


export interface IInitialDatabaseBrowser {
    readonly kind: DatabaseBrowserKind.Initial;
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
    readonly moleculeKind: MoleculeKind;
}
