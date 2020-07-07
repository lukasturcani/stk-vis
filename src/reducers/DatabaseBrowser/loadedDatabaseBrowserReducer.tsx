import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    ILoadedDatabaseBrowser,
    SearchKind,
} from '../../models';
import {
    unsortedOneReducer,
} from './unsortedOneReducer';
import {
    unsortedBothReducer,
} from './unsortedBothReducer';
import {
    sortedOneReducer,
} from './sortedOneReducer';
import {
    sortedBothReducer,
} from './sortedBothReducer';




export function loadedDatabaseBrowserReducer(
    state: ILoadedDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    switch( state.searchKind)
    {
        case SearchKind.UnsortedBoth:
        {
            return unsortedBothReducer(state, action);
        }

        case SearchKind.UnsortedBuildingBlocks:
        case SearchKind.UnsortedConstructedMolecules:
        {
            return unsortedOneReducer(state, action);
        }

        case SearchKind.SortedBoth:
        {
            return sortedBothReducer(state, action);
        }

        case SearchKind.SortedBuildingBlocks:
        case SearchKind.SortedConstructedMolecules:
        {
            return sortedOneReducer(state, action);
        }

        default:
        {
            assertNever(state);
        }
    }
}


function assertNever(arg: never): never { throw Error(); }
