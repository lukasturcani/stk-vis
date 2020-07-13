import { AnyAction } from '@reduxjs/toolkit';
import { updateTable, IMolecule } from 'actions/updateTable';


export function moleculesReducer(
    state: IMolecule[] = [],
    action: AnyAction,
)
    : IMolecule[]
{
    if (updateTable.match(action))
    {
        return action.payload.molecules;
    }
    return state;
}
