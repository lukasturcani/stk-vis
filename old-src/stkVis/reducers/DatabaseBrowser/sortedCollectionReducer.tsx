import { AnyAction } from '@reduxjs/toolkit';
import { SortSettingsKind } from '../../models';
import { setSortSettings } from '../../actions';


export function sortedCollectionReducer(
    state: string = 'THIS IS THE DEFAULT REDUCER VALUE '+
                    'AND YOU SHOULD NEVER SEE IT',
    action: AnyAction,
)
    : string
{
    if (setSortSettings.match(action))
    {
        switch (action.payload.kind)
        {
            case SortSettingsKind.Unsorted:
                return  state;

            case SortSettingsKind.Sorted:
                return action.payload.collection;

            default:
                assertNever(action.payload);
        }
    }
    return state;
}


function assertNever(arg: never): never { throw Error(); }
