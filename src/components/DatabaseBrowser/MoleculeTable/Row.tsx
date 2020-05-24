import * as React from 'react';
import { connect } from 'react-redux';
import {
    getMoleculeTableEntry,
    getVisibleColumns,
} from '../../../selectors';
import {
    ILoadedDatabaseBrowser,
} from '../../../models';
import {
    Maybe,
    MaybeKind,
} from '../../../utilities';


function assertNever(arg: never): never { throw Error(); }


interface IColumnValues {
    [columnName: string]: string
}


function _Row({ columns }: { columns: IColumnValues})
{
    return (<tr>{
        Object.entries(columns).map(
            ([name, value]) => <td key={name}>{value}</td>
        )
    }</tr>);
}


function mapStateToProps(
    state: ILoadedDatabaseBrowser,
    { moleculeId }: { moleculeId: number },
)
    : { columns: IColumnValues }
{
    let columns: IColumnValues = {};

    for (
        let column
        of Object.getOwnPropertyNames(getVisibleColumns(state))
    ) {
        const entry: Maybe<string> = getMoleculeTableEntry({
            state: state,
            columnName: column,
            moleculeId: moleculeId,
        });

        switch (entry.kind) {

            case MaybeKind.Just:
                columns[column] = entry.value;
                break;

            case MaybeKind.Nothing:
                columns[column] = '';
                break;

            default:
                assertNever(entry);
                break;

        }
    }

    return { columns };
}


export const Row = connect(mapStateToProps)(_Row);
