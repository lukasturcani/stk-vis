import {
    ILoadedDatabaseBrowserBase,
} from './ILoadedDatabaseBrowserBase';
import {
    SearchKind
} from '../SearchKind';
import { SortType } from './SortType';




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
    searchKind:
        SearchKind.SortedBuildingBlocks
        |
        SearchKind.SortedConstructedMolecules;
    sortedCollection: string;
    sortType: SortType;
}
