import * as React from 'react';
import { connect } from 'react-redux';
import { Row } from './Row';
import {
    ILoadedDatabaseBrowser,
} from '../../../models';
import {
    getVisibleColumns,
    getTableMolecules,
} from '../../../selectors';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';


interface IMoleculeTableProps {
    columns: string[],
    moleculeIds: number[],
}


function MoleculeTable({columns, moleculeIds}: IMoleculeTableProps) {
    return (
        <Paper
            style={{height: '100%', overflow: 'auto'}}
        ><TableContainer><Table>
            <TableHead>
                <TableRow>{columns.map(
                    column => <TableCell key={column}>
                        {column}
                    </TableCell>
                )}</TableRow>
            </TableHead>
            <TableBody>{moleculeIds.map(
                moleculeId => <Row
                    key={moleculeId}
                    moleculeId={moleculeId}
                />
            )}</TableBody>
        </Table></TableContainer></Paper>
    )
}


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
