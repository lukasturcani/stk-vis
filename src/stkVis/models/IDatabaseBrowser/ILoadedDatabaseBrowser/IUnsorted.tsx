import {
    ILoadedDatabaseBrowserBase,
} from './ILoadedDatabaseBrowserBase';
import {
    SearchKind,
} from '../SearchKind';



export interface IUnsortedBoth
extends ILoadedDatabaseBrowserBase
{
    searchKind: SearchKind.UnsortedBoth;
    buildingBlockPositionMatrixCollection: string;
}


export interface IUnsortedOne
extends ILoadedDatabaseBrowserBase
{
    searchKind:
        SearchKind.UnsortedBuildingBlocks
        |
        SearchKind.UnsortedConstructedMolecules;
}
