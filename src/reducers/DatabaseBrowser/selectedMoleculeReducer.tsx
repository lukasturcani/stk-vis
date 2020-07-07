import { AnyAction } from '@reduxjs/toolkit';
import { selectMolecule, setSortSettings } from '../../actions';


export function selectedMoleculeReducer(
    state: number = 0,
    action: AnyAction,
)
    : number
{
    if (selectMolecule.match(action))
    {
        return action.payload;
    }
    if (setSortSettings.match(action))
    {
        return 0;
    }
    return state;
}
