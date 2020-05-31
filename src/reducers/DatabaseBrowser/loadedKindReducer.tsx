import { AnyAction } from '@reduxjs/toolkit';
import { DatabaseBrowserKind } from '../../models';


export function loadedKindReducer(
    state: DatabaseBrowserKind.Loaded = DatabaseBrowserKind.Loaded,
    action: AnyAction,
)
    : DatabaseBrowserKind.Loaded
{
    return state;
}
