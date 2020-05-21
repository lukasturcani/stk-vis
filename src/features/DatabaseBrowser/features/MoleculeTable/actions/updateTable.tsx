import { createAction } from '@reduxjs/toolkit'
import {
    IMolecule,
    IVisibleColumns,
    IMoleculeTable,
} from '../model';


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    (molecules: IMolecule[], visibleColumns: IVisibleColumns)
    : { payload: IMoleculeTable } => {
        return {
            payload: {
                molecules,
                visibleColumns,
            },
        };
    },
);
