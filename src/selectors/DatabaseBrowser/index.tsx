import { Maybe, Just, Nothing } from '../../utilities';
import { IState } from '../../models';


export function getMoleculeTableEntry({
    state,
    columnName,
    moleculeId,
}: {
    state: IState,
    columnName: string,
    moleculeId: number,
}): Maybe<string>
{
    const visibleColumns: IVisibleColumns = getVisibleColumns(state);
    const entry: string | undefined
        = visibleColumns[columnName][moleculeId];

    if (entry === undefined) {
        // This shouldn't compile because its Just<undefined>.
        return new Just(entry);
    } else {
        return new Nothing();
    }
}
