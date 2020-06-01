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
    propertyCollections,
}: {
    molecules: IMolecule[],
    columnValues: IColumnValues,
    pageIndex: number,
    pageKind: PageKind,
    propertyCollections: string[],
}
): { payload: ITableValues }
{
    return {
        payload: {
            molecules,
            columnValues,
            pageIndex,
            pageKind,
            propertyCollections,
        },
    };
}


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    actionCreator,
);
