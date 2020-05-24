import { Maybe, Just, Nothing } from '../../utilities';
import {
    IState,
    ILoadedDatabaseBrowser,
    IInitialDatabaseBrowser,
    IDatabaseBrowser,
    IVisibleColumns,
    IMolecule,
    IColumn,
    IInitialRequestState,
    IMoleculeRequestState,
    DatabaseBrowserKind,
} from '../../models';
import * as fp from 'lodash/fp';


export function getDatabaseBrowserKind(
    state: IDatabaseBrowser,
)
    : DatabaseBrowserKind
{
    return state.kind;
}


export function getMoleculeTableEntry({
    state,
    columnName,
    moleculeId,
}: {
    state: ILoadedDatabaseBrowser,
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


export function getVisibleColumns(
    state: ILoadedDatabaseBrowser,
)
    : IVisibleColumns
{
    return state.visibleColumns;
}


export function getTableMolecules(
    state: ILoadedDatabaseBrowser,
)
    : IMolecule[]
{
    return state.molecules;
}


export function getMoleculeRequestState(
    state: ILoadedDatabaseBrowser,
)
    : IMoleculeRequestState
{
    return state.moleculeRequestState;
}


export function getInitialRequestState(
    state: IInitialDatabaseBrowser,
)
    : IInitialRequestState
{
    return state.initialRequestState;
}


export function getMongoDbUrl(state: IDatabaseBrowser): string {
    return state.url;
}


export function getMongoDbDatabase(state: IDatabaseBrowser): string {
    return state.database;
}


export function getMongoDbMoleculeCollection(
    state: IDatabaseBrowser,
)
    : string
{
    return state.moleculeCollection;
}


export function getMongoDbPositionMatrixCollection(
    state: IDatabaseBrowser,
)
    : string
{
    return state.positionMatrixCollection;
}
