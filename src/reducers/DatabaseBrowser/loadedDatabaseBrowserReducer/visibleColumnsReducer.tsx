import { AnyAction } from '@reduxjs/toolkit';


export function visibleColumnsReducer(
    state: string[] = ['InChIKey', 'SMILES', 'numAtoms'],
    action: AnyAction,
)
    : string[]
{
    return state;
}
