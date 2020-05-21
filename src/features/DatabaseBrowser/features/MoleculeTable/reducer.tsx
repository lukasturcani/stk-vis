import { combineReducers, Action } from '@reduxjs/toolkit';
import { updateTable } from './actions';
import { IMoleculeTable } from './model';


export const MoleculeTableReducer
    : (state: IMoleculeTable, action: Action) => IMoleculeTable
= (state: IMoleculeTable, action: Action): IMoleculeTable => {
    if (updateTable.match(action)) {
        return action.payload;
    }
    return state;
};
