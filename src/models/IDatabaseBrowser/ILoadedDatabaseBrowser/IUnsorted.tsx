import {
    ILoadedDatabaseBrowserBase,
} from './ILoadedDatabaseBrowserBase';
import {
    MoleculeKind,
} from '../../MoleculeKind';



export interface IUnsortedBoth
extends ILoadedDatabaseBrowserBase
{
    moleculeKind: MoleculeKind.UnsortedBoth;
    buildingBlockPositionMatrixCollection: string;
}


export interface IUnsortedOne
extends ILoadedDatabaseBrowserBase
{
    moleculeSelectionKind:
        MoleculeKind.UnsortedBuildingBlocks
        |
        MoleculeKind.UnsortedConstructedMolecules;
}
