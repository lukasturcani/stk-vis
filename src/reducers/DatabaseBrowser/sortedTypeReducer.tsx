import { AnyAction } from '@reduxjs/toolkit';
import { SortedType, SortSettingsKind } from '../../models';
import { setSortSettings } from '../../actions';


export function sortedTypeReducer(
    state: SortedType = SortedType.Ascending,
    action: AnyAction,
)
    : SortedType
{
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return  state;

            case SortSettingsKind.Sorted:
                return action.payload.sortedType;

            default:
                assertNever(action.payload);
        }
    }
    return state;
}


function assertNever(arg: never): never { throw Error(); }
