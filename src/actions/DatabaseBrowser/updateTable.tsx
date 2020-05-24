import { createAction, createReducer } from '@reduxjs/toolkit'
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
