import { AnyAction } from '@reduxjs/toolkit';
import { updateTable } from '../../../actions';


export function visibleColumnsReducer(
    state: string[] = ['InChIKey', 'SMILES', 'numAtoms'],
    action: AnyAction,
)
    : string[]
{
    if (updateTable.match(action))
    {
        return Object.keys(action.payload.columnValues);
    }
    return state;
}
