import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';
import {
    MoleculeSelectionKind
} from '../../MoleculeSelectionKind';


export const enum SortType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedBoth
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Sorted;
    moleculeSelectionKind: MoleculeSelectionKind.Both;
    sortedCollection: string;
    sortType: SortType;
    buildingBlockPositionMatrixCollection: string;
}


export interface ISortedOne
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Sorted;
    moleculeSelectionKind:
        MoleculeSelectionKind.BuildingBlocks
        |
        MoleculeSelectionKind.ConstructedMolecules;
    sortedCollection: string;
    sortType: SortType;
}
