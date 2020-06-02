import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import {
    ILoadedDatabaseBrowser,
    IColumnValues,
} from '../../../models';
import {
    getVisibleColumns,
    getTableMolecules,
    getColumnValues,
    getSelectedMolecule,
} from '../../../selectors';
import {
    selectMolecule,
} from '../../../actions';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import * as fp from 'lodash/fp';


interface IMoleculeTableProps {
    columns: string[];
    moleculeIds: number[];
    columnValues: IColumnValues;
    dispatchSelectMolecule: (moleculeId: number) => void;
    selectedMolecule: number;
}


function MoleculeTable(
    props: IMoleculeTableProps
) {
    return (
        <Paper
            style={{height: '100%', overflow: 'auto'}}
        >
        <MaterialTable
            options={{
                toolbar: true,
                search: false,
                paging: false,
                sorting: false,
                showTitle: false,
                rowStyle: rowData => {
                    return {backgroundColor: (
                        props.selectedMolecule === rowData.tableData.id
                    )? '#616161' : '#424242'
                }},
            }}
            columns={
                props.columns.map(
                    (name: string) => ({ title: name, field: name })
                )
            }
            data={
                props.moleculeIds.map(
                    (moleculeId: number) => (
                        getRowValues(
                            props.columnValues,
                            props.columns,
                            moleculeId,
                        )
                    )
                )
            }
            onRowClick={
                (e, selectedRow: any) => props.dispatchSelectMolecule(
                    selectedRow.tableData.id
                )
            }
        />
        </Paper>
    );
}



function getRowValues(
    columnValues: IColumnValues,
    columns: string[],
    moleculeId: number,
)
    : { [columnName: string]: string }
{

    const rowValues: { [columnName: string]: string }
        = {};

    for (const column of columns)
    {
        const entry: string | undefined
            = fp.get([column, moleculeId], columnValues);

        if (entry !== undefined)
        {
            rowValues[column] = entry;
        }
    }
    return rowValues;
}




function mapStateToProps(
    state: ILoadedDatabaseBrowser,
)
{
    return {
        columns: getVisibleColumns(state),
        moleculeIds: Array.from(
            {length: getTableMolecules(state).length},
            (_, i) => i,
        ),
        columnValues: getColumnValues(state),
        selectedMolecule: getSelectedMolecule(state),
    };
}


function mapDispatchToProps(
    dispatch: (action: AnyAction) => void
)
{
    return {
        dispatchSelectMolecule: (moleculeId: number) => {
            dispatch(selectMolecule(moleculeId));
        },
    };
}


export const MoleculeTableComponent
    =  connect(mapStateToProps, mapDispatchToProps)(MoleculeTable);
