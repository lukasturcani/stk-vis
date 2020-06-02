import { AnyAction } from '@reduxjs/toolkit';
import { SortedKind, SortSettingsKind } from '../../models';
import { setSortSettings } from '../../actions';


export function sortedKindReducer(
    state: SortedKind = SortedKind.Unsorted,
    action: AnyAction,
)
    : SortedKind
{
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return SortedKind.Unsorted;

            case SortSettingsKind.Sorted:
                return SortedKind.Sorted;

            default:
                assertNever(action.payload);
        }
    }
    return state;
}



function assertNever(arg: never): never { throw Error(); }
