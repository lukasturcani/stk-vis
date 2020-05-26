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
import {
    makeStyles,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@material-ui/core';


interface IMoleculeTableProps {
    columns: string[],
    moleculeIds: number[],
}


const useStyles = makeStyles({
    table: {},
});


function MoleculeTable({columns, moleculeIds}: IMoleculeTableProps) {
    const classes = useStyles();

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>{
                        columns.map(
                            column =>
                                <TableCell key={column}>
                                    {column}
                                </TableCell>
                        )
                    }</TableRow>
                </TableHead>
                <TableBody>{
                    moleculeIds.map(
                        moleculeId => <Row
                            key={moleculeId}
                            moleculeId={moleculeId}
                        />
                    )
                }</TableBody>
            </Table>
        </TableContainer>
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
