import {
    ILoadedDatabaseBrowserBase,
} from './ILoadedDatabaseBrowserBase';
import {
    SearchKind
} from '../SearchKind';


export const enum SortType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedBoth
    extends ILoadedDatabaseBrowserBase
{
    searchKind: SearchKind.SortedBoth;
    sortedCollection: string;
    sortType: SortType;
    buildingBlockPositionMatrixCollection: string;
}


export interface ISortedOne
    extends ILoadedDatabaseBrowserBase
{
    moleculeKind:
        SearchKind.SortedBuildingBlocks
        |
        SearchKind.SortedConstructedMolecules;
    sortedCollection: string;
    sortType: SortType;
}
