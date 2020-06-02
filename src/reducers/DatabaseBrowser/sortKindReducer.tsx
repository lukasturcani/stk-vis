import { AnyAction } from '@reduxjs/toolkit';
import { SortKind, SortSettingsKind } from '../../models';
import { setSortSettings } from '../../actions';


export function sortedKindReducer(
    state: SortKind = SortKind.Unsorted,
    action: AnyAction,
)
    : SortKind
{
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return SortKind.Unsorted;

            case SortSettingsKind.Sorted:
                return SortKind.Sorted;

            default:
                assertNever(action.payload);
        }
    }
    return state;
}



function assertNever(arg: never): never { throw Error(); }
