import { combineReducers, Action } from '@reduxjs/toolkit';
import { updateTable } from '../../actions';
import { IMoleculeTable } from '../../models';


export function moleculeTableReducer(
    state: IMoleculeTable,
    action: Action,
): IMoleculeTable
{
    if (updateTable.match(action)) {
        return action.payload;
    }
    return state;
}
