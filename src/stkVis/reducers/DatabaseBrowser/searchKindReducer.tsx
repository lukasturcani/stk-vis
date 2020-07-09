import { AnyAction } from '@reduxjs/toolkit';
import {
    updateMongoDbFields,
} from '../../actions';
import {
    SearchKind,
    UnsortedSearchKind,
} from '../../models';




export function initialSearchKindReducer(
    state: UnsortedSearchKind = SearchKind.UnsortedBoth,
    action: AnyAction,
)
    : UnsortedSearchKind
{
    if (updateMongoDbFields.match(action))
    {
        return action.payload.searchKind;
    }
    return state;
}
