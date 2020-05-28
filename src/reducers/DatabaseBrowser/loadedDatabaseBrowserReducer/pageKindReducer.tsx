import { AnyAction } from '@reduxjs/toolkit';
import { PageKind } from '../../../models';
import {
    updateTable,
} from '../../../actions';


export function pageKindReducer(
    state: PageKind = PageKind.OnlyIncomplete,
    action: AnyAction,
)
    : PageKind
{
    if (updateTable.match(action))
    {
        return action.payload.pageKind;
    }
    return state;
}
