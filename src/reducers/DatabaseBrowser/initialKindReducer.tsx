import { AnyAction } from '@reduxjs/toolkit';
import { DatabaseBrowserKind } from '../../../models';


export function initialKindReducer(
    state: DatabaseBrowserKind.Initial = DatabaseBrowserKind.Initial,
    action: AnyAction,
)
    : DatabaseBrowserKind.Initial
{
    return state;
}
