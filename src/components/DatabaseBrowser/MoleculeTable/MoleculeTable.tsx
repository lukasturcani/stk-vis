import * as React from 'react';
import { connect } from 'react-redux';
import { Row } from './Row';
import {
    ILoadedDatabaseBrowser,
    IVisibleColumns
} from '../../../models';
import {
    getVisibleColumns,
    getTableMolecules,
} from '../../../selectors';


interface IMoleculeTableProps {
    columns: IVisibleColumns,
    moleculeIds: number[],
}


function MoleculeTable({columns, moleculeIds}: IMoleculeTableProps) {
    return (
        <table>
            <thead>
                <tr>{
                    Object.getOwnPropertyNames(columns).map(
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
