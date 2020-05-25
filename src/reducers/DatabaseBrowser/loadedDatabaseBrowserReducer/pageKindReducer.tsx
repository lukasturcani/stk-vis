import { AnyAction } from '@reduxjs/toolkit';
import { PageKind } from '../../../models';
import {
    updateTable,
    setLastPage,
} from '../../../actions';


export function pageKindReducer(
    state: PageKind = PageKind.Only,
    action: AnyAction,
)
    : PageKind
{
    if (updateTable.match(action))
    {
        return action.payload.pageKind;
    }
    if (setLastPage.match(action))
    {
        return PageKind.Last;
    }
    return state;
}
