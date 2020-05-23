import { combineReducers, Action } from '@reduxjs/toolkit';
import { updateTable } from '../../actions';
import { IMoleculeTable } from '../../models';

const initialTable: IMoleculeTable = {
    molecules: [{}, {}, {}, {}, {}],
    visibleColumns: {
        'InChIKey': {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
        },
    },
};

export function moleculeTableReducer(
    state: IMoleculeTable,
    action: Action,
): IMoleculeTable
{
    if (state === undefined) {
        return initialTable;
    }


    if (updateTable.match(action)) {
        return action.payload;
    }
    return state;
}
