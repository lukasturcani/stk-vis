import { createAction } from '@reduxjs/toolkit'
import {
    IMolecule,
    IColumnValues,
    ITableValues,
    PageKind,
} from '../../models';


function actionCreator({
    molecules,
    columnValues,
    pageIndex,
    pageKind,
}: {
    molecules: IMolecule[],
    columnValues: IColumnValues,
    pageIndex: number,
    pageKind: PageKind
}
): { payload: ITableValues }
{
    return {
        payload: {
            molecules,
            columnValues,
            pageIndex,
            pageKind,
        },
    };
}


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    actionCreator,
);
