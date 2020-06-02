import { DatabaseBrowserKind } from '../DatabaseBrowserKind';
import { IMoleculeRequestState } from '../../IMoleculeRequestState';
import {
    IMolecule,
    IColumnValues,
} from '../../IMoleculeTable';


export const enum PageKind
{
    First = 'First',
    Middle = 'Middle',
    LastComplete = 'Last Complete',
    LastIncomplete = 'Last Incomplete',
    OnlyComplete = 'Only Complete',
    OnlyIncomplete = 'Only Incomplete',
}


export const enum SortKind
{
    Sorted = 'Sorted',
    Unsorted = 'Unsorted',
}


export interface ILoadedDatabaseBrowserBase {
    readonly kind: DatabaseBrowserKind.Loaded;
    readonly sortKind: SortKind;
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
    readonly selectedMolecule: number;
}
