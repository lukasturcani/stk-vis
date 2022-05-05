import * as React from 'react';
import {
    Props as MoleculeTableProps,
    get,
} from 'Page.MoleculeTable'

type Empty = Record<string, unknown>;

export interface DispatchProps<a>
{
    dispatch: (action: a) => void;
}

interface Props<a> extends MoleculeTableProps<a>, DispatchProps<a>
{
    container: React.FunctionComponent<Empty>;
    table: React.FunctionComponent<TableProps>
    snackbar: React.FunctionComponent<SnackbarProps>;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}

interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export type CoreProps<a> = DispatchProps<a> & MoleculeTableProps<a>;

export interface TableColumn
{
    title: string;
    field: string;
}

export interface RowData
{
    [column: string]: string
}

export interface TableProps
{
    columns: TableColumn[];
    data: RowData[];
    onRowClick: (event: any, selectedRow: any) => void;
    selectedRow: number;
    actions: TableAction[];
}

export interface TableAction
{
    icon: string;
    tooltip: string;
    onClick: (event: any, selectRow: any) => void;
}


export function MoleculeTable<a>(
    props: Props<a>,
)
{
    const columns = props.columns;

    const snackbar: Snackbar
        = getSnackbar();

    return (
        <props.container>
            <props.table
                actions={[
                    {
                        icon: 'zoom_in',
                        tooltip: 'Get building blocks.',
                        onClick: (event, rowData) => {

                            const row: number
                                = rowData.tableData.id;

                            props.buildingBlockRequests()[row](
                                props.dispatch
                            )
                            ({
                                setOpen: snackbar.setOpen,
                                setMessage: snackbar.setMessage,
                            });
                        },
                    },
                ]}
                columns={
                    columns.map(
                        name => ({title: name, field: name})
                    )
                }
                data={
                    props.rows.map(row => {

                        const rowGet = get(row)

                        const data: { [column: string]: string }
                            = {};

                        for (const column of columns)
                        {
                            const value =rowGet(column);
                            if (value === undefined)
                            {
                                data[column] = '';
                            }
                            else
                            {
                                data[column] = value;
                            }
                        }
                        return data;
                    })
                }
                selectedRow={props.selectedRow}
                onRowClick={
                    (e, selectedRow) => {
                        const id: number = selectedRow.tableData.id;

                        props.selectMolecule
                            (props.dispatch)
                            (id)
                            (props.molecules[id])
                    }
                }
            />
            <props.snackbar
                open={snackbar.open}
                onClose={snackbar.onClose}
                message={snackbar.message}
            />
        </props.container>
    );
}


function getSnackbar(): Snackbar
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onClose = (event?: React.SyntheticEvent, reason?: string) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        onClose,
    };
}
