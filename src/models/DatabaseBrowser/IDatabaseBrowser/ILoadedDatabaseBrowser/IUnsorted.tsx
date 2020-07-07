import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';
import {
    ISelectBoth,
    ISelectBuildingBlocks,
    ISelectConstructedMolecules,
} from '../../IMoleculeSelectionType';



export interface IUnsortedBoth
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Unsorted;
    moleculeSelectionType: ISelectBoth;
    buildingBlockPositionMatrixCollection: string;
}


export interface IUnsortedOne
    extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Unsorted;
    moleculeSelectionType:
        ISelectBuildingBlocks | ISelectConstructedMolecules;
}
