import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';
import {
    ISelectBoth,
    ISelectBuildingBlocks,
    ISelectConstructedMolecules,
} from '../../IMoleculeSelectionType';


export const enum SortType
{
    Ascending = 'Ascending',
    Descending = 'Descending',
}


export interface ISortedBoth
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Sorted;
    sortedCollection: string;
    sortType: SortType;
    moleculeSelectionType: ISelectBoth;
    buildingBlockPositionMatrixCollection: string;
}


export interface ISortedOne
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Sorted;
    sortedCollection: string;
    sortType: SortType;
    moleculeSelectionType:
        ISelectBuildingBlocks | ISelectConstructedMolecules;
}
