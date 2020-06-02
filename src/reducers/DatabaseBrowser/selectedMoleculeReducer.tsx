import { AnyAction } from '@reduxjs/toolkit';
import { selectMolecule } from '../../actions';


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
    return state;
}
