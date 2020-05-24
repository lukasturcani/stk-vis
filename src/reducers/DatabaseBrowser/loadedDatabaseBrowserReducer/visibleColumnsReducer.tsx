import { AnyAction } from '@reduxjs/toolkit';
import { updateTable } from '../../../actions';


export function visibleColumnsReducer(
    state: string[] = ['InChIKey', 'SMILES', 'numAtoms'],
    action: AnyAction,
)
    : string[]
{
    return state;
}
