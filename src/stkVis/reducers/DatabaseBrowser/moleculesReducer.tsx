import { AnyAction } from '@reduxjs/toolkit';
import { IMolecule } from '../../models';
import { updateTable } from '../../actions';


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
