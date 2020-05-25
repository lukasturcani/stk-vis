import { createAction, createReducer } from '@reduxjs/toolkit'
import {
    IMolecule,
    IColumnValues,
    ITableValues,
} from '../../models';


function actionCreator({
    molecules,
    columnValues,
    pageIndex,
}: {
    molecules: IMolecule[],
    columnValues: IColumnValues,
    pageIndex: number,
}
): { payload: ITableValues }
{
    return {
        payload: {
            molecules,
            columnValues,
            pageIndex,
        },
    };
}


export const updateTable = createAction(
    'DatabaseBrowser/MoleculeTable/updateTable',
    actionCreator,
);

const increment = createAction(
    'increment',
    (n: number): { payload: number } =>  {
        return { payload: n }
    },
);
const decrement = createAction('decrement')

createReducer(0, builder =>
  builder.addCase(increment, (state, action) => {
      return action.payload;
  })
)
