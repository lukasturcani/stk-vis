import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Row } from './Row';
import {
    ILoadedDatabaseBrowser,
    IColumnValues,
    IColumn,
} from '../../../models';
import {
    getColumnValues,
    getVisibleColumns,
    getTableMolecules,
} from '../../../selectors';


interface IMoleculeTableProps {
    columns: string[],
    moleculeIds: number[],
}


function MoleculeTable({columns, moleculeIds}: IMoleculeTableProps) {
    return (
        <table>
            <thead>
                <tr>{
                    columns.map(
                        column => <th key={column}>{column}</th>
                    )
                }</tr>
            </thead>
            <tbody>{
                moleculeIds.map(
                    moleculeId => <Row
                        key={moleculeId}
                        moleculeId={moleculeId}
                    />
                )
            }</tbody>
        </table>
    )
};


function mapStateToProps(
    state: ILoadedDatabaseBrowser,
)
    : IMoleculeTableProps
{
    return {
        columns: getVisibleColumns(state),
        moleculeIds: Array.from(
            {length: getTableMolecules(state).length},
            (_, i) => i,
        ),
    };
}


export const MoleculeTableComponent
    =  connect(mapStateToProps)(MoleculeTable);
