import { AnyAction } from '@reduxjs/toolkit';
import { SortedType } from '../../models';


export function sortedTypeReducer(
    state: SortedType = SortedType.Ascending,
    action: AnyAction,
)
    : SortedType
{
    return state;
}
