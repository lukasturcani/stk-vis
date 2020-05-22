import { createAction } from '@reduxjs/toolkit'
import {
    IMolecule,
    IVisibleColumns,
    IMoleculeTable,
} from '../../models';


function actionCreator({
    molecules,
    visibleColumns
}: {
    molecules: IMolecule[],
    visibleColumns: IVisibleColumns,
}
): { payload: IMoleculeTable }
{
    return {
        payload: {
            molecules,
            visibleColumns,
        },
    };
}


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    actionCreator,
);
