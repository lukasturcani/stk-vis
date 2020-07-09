import { AnyAction } from '@reduxjs/toolkit';
import { SortType, SortSettingsKind } from '../../models';
import { setSortSettings } from '../../actions';


export function sortTypeReducer(
    state: SortType = SortType.Ascending,
    action: AnyAction,
)
    : SortType
{
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return  state;

            case SortSettingsKind.Sorted:
                return action.payload.sortType;

            default:
                assertNever(action.payload);
        }
    }
    return state;
}


function assertNever(arg: never): never { throw Error(); }
