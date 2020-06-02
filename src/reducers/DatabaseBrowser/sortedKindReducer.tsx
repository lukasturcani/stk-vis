import { AnyAction } from '@reduxjs/toolkit';
import { SortedKind } from '../../models';


export function sortedKindReducer(
    state: SortedKind = SortedKind.Unsorted,
    action: AnyAction,
)
    : SortedKind
{
    return state;
}
