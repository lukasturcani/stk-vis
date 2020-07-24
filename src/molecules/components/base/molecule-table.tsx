import * as React from 'react';
import {
    MoleculeTableProps,
    get,
} from 'Molecules.Molecules'

type Empty = Record<string, unknown>;


interface Props extends MoleculeTableProps
{
    container: React.FunctionComponent<Empty>;
    table: React.FunctionComponent<TableProps>
}

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
}


export function MoleculeTable(
    props: Props,
)
{
    const columns = props.value0.columns;

    return (
        <props.container>
            <props.table
                columns={
                    columns.map(
                        name => ({title: name, field: name})
                    )
                }
                data={
                    props.value0.rows.map(row => {

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
                selectedRow={props.value0.selectedRow}
                onRowClick={
                    (e, selectedRow) => console.log(e, selectedRow)
                }
            />
        </props.container>
    );
}
