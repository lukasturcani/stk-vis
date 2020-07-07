import {
    ILoadedDatabaseBrowserBase,
} from './ILoadedDatabaseBrowserBase';
import {
    MoleculeKind
} from '../../MoleculeKind';


export const enum SortType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedBoth
    extends ILoadedDatabaseBrowserBase
{
    moleculeKind: MoleculeKind.SortedBoth;
    sortedCollection: string;
    sortType: SortType;
    buildingBlockPositionMatrixCollection: string;
}


export interface ISortedOne
    extends ILoadedDatabaseBrowserBase
{
    moleculeKind:
        MoleculeKind.SortedBuildingBlocks
        |
        MoleculeKind.SortedConstructedMolecules;
    sortedCollection: string;
    sortType: SortType;
}
