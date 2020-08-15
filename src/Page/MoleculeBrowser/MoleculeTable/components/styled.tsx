import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import {
    TableProps,
    MoleculeTable as MoleculeTableBase,
    CoreProps,
} from './base';


export function MoleculeTable<a>(
    props: CoreProps<a>,
)
{
    return <MoleculeTableBase
        container={Container}
        table={Table}
        {...props}
    />;
}

type Empty= Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Grid item
            xs={6}
            style={{
                height: '83%',
            }}
        >
            <Paper
                style={{
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                {props.children}
            </Paper>
        </Grid>
    );


const Table: React.FunctionComponent<TableProps>
    = (props) => (
        <MaterialTable
            options={{
                toolbar: true,
                search: false,
                paging: false,
                sorting: false,
                showTitle: false,
                rowStyle: rowData => {
                    return {backgroundColor: (
                        props.selectedRow === rowData.tableData.id
                    )? '#616161' : '#424242'
                }}
            }}
            columns={props.columns}
            data={props.data}
            onRowClick={props.onRowClick}
            actions={props.actions}
        />
    );
