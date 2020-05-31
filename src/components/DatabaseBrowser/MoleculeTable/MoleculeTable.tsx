import * as React from 'react';
import { connect } from 'react-redux';
import {
    ILoadedDatabaseBrowser,
    IColumnValues,
} from '../../../models';
import {
    getVisibleColumns,
    getTableMolecules,
    getColumnValues,
} from '../../../selectors';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import * as fp from 'lodash/fp';
import Sort from '@material-ui/icons/Sort';


interface IMoleculeTableProps {
    columns: string[];
    moleculeIds: number[];
    columnValues: IColumnValues;
}


function MoleculeTable(
    {columns, moleculeIds, columnValues}: IMoleculeTableProps
) {
    return (
        <Paper
            style={{height: '100%', overflow: 'auto'}}
        ><MaterialTable
            options={{
                toolbar: true,
                search: false,
                paging: false,
                sorting: false,
                showTitle: false,
            }}
            columns={
                columns.map(
                    (name: string) => ({ title: name, field: name })
                )
            }
            data={
                moleculeIds.map(
                    (moleculeId: number) => (
                        getRowValues(
                            columnValues,
                            columns,
                            moleculeId,
                        )
                    )
                )
            }
            actions={[
                {
                    icon: Sort,
                    tooltip: 'Sort',
                    isFreeAction: true,
                    iconProps: {
                        fontSize: 'large',
                    },
                    onClick: (event) => alert('You want to sort'),
                },
            ]}
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
    : IMoleculeTableProps
{
    return {
        columns: getVisibleColumns(state),
        moleculeIds: Array.from(
            {length: getTableMolecules(state).length},
            (_, i) => i,
        ),
        columnValues: getColumnValues(state),
    };
}


export const MoleculeTableComponent
    =  connect(mapStateToProps)(MoleculeTable);
