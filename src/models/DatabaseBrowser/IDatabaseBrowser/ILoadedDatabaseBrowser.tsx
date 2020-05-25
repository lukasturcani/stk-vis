import { DatabaseBrowserKind } from './DatabaseBrowserKind';
import { IMoleculeRequestState } from '../IMoleculeRequestState';
import {
    IMolecule,
    IColumnValues,
} from '../IMoleculeTable';


export const enum PageKind
{
    First = 'First',
    Middle = 'Middle',
    Last = ' Last',
    Only = 'Only',
}


export interface ILoadedDatabaseBrowser {
    readonly kind: DatabaseBrowserKind.Loaded;
    readonly url: string;
    readonly database: string;
    readonly moleculeCollection: string;
    readonly positionMatrixCollection: string;
    readonly propertyCollections: string[];
    readonly moleculeRequestState: IMoleculeRequestState;
    readonly molecules: IMolecule[];
    readonly visibleColumns: string[];
    readonly columnValues: IColumnValues;
    readonly pageIndex: number;
    readonly numEntriesPerPage: number;
    readonly pageKind: PageKind;
}
