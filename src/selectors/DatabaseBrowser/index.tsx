import { Maybe, Just, Nothing } from '../../utilities';
import {
    IState,
    IVisibleColumns,
    IMolecule,
    IColumn,
} from '../../models';
import * as fp from 'lodash/fp';


export function getMoleculeTableEntry({
    state,
    columnName,
    moleculeId,
}: {
    state: IState,
    columnName: string,
    moleculeId: number,
}
): Maybe<string>
{
    const visibleColumns: IVisibleColumns = getVisibleColumns(state);
    const entry: string | undefined
        = fp.get([columnName, moleculeId], visibleColumns);

    if (entry === undefined) {
        return new Nothing();
    } else {
        return new Just(entry);
    }
}


export function getVisibleColumns(state: IState): IVisibleColumns {
    return state.databaseBrowser.moleculeTable.visibleColumns;
}


export function getTableMolecules(state: IState): IMolecule[] {
    return state.databaseBrowser.moleculeTable.molecules;
}
