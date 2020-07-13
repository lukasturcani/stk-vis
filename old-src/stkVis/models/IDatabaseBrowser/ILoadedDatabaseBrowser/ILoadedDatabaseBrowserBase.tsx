import { DatabaseBrowserKind } from '../DatabaseBrowserKind';
import { IMoleculeRequestState } from './IMoleculeRequestState';
import { SearchKind } from '../SearchKind';
import {
    IMolecule,
    IColumnValues,
} from './IMoleculeTable';
import { PageKind } from './PageKind';


export interface ILoadedDatabaseBrowserBase {
    readonly kind: DatabaseBrowserKind.Loaded;
    readonly searchKind: SearchKind;
    readonly url: string;
    readonly moleculeKey: string;
    readonly database: string;
    readonly moleculeCollection: string;
    readonly constructedMoleculeCollection: string;
    readonly positionMatrixCollection: string;
    readonly propertyCollections: string[];
    readonly moleculeRequestState: IMoleculeRequestState;
    readonly molecules: IMolecule[];
    readonly visibleColumns: string[];
    readonly columnValues: IColumnValues;
    readonly pageIndex: number;
    readonly numEntriesPerPage: number;
    readonly pageKind: PageKind;
    readonly selectedMolecule: number;
}
