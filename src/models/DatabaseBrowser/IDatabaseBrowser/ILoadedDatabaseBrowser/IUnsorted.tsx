import {
    ILoadedDatabaseBrowserBase,
    SortKind,
} from './ILoadedDatabaseBrowserBase';
import {
    MoleculeSelectionKind
} from '../../MoleculeSelectionKind';



export interface IUnsortedBoth
extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Unsorted;
    moleculeSelectionKind: MoleculeSelectionKind.Both;
    buildingBlockPositionMatrixCollection: string;
}


export interface IUnsortedOne
extends ILoadedDatabaseBrowserBase
{
    sortKind: SortKind.Unsorted;
    moleculeSelectionKind:
        MoleculeSelectionKind.BuildingBlocks
        |
        MoleculeSelectionKind.ConstructedMolecules;
}
