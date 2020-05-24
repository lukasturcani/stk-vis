import { createAction, createReducer } from '@reduxjs/toolkit'
import {
    IMolecule,
    IColumnValues,
    ITableValues,
} from '../../models';


function actionCreator({
    molecules,
    columnValues
}: {
    molecules: IMolecule[],
    columnValues: IColumnValues,
}
): { payload: ITableValues }
{
    return {
        payload: {
            molecules,
            columnValues,
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
