export interface IMolecule {
}


export type IColumn = {
    readonly [moleculeId: number]: string
};


export type IVisibleColumns = {
    readonly [columnName: string]: IColumn
};


export interface IMoleculeTable {
    readonly molecules: IMolecule[];
    readonly visibleColumns: IVisibleColumns;
}
