export interface IMolecule {
    readonly atoms: any;
    readonly bonds: any;
    readonly [keyName: string]: string;
}


export type IColumn = {
    readonly [moleculeId: number]: string
};


export type IColumnValues = {
    readonly [columnName: string]: IColumn
};


export interface ITableValues {
    readonly molecules: IMolecule[];
    readonly columnValues: IColumnValues;
}


export interface IMoleculeTable {
    readonly molecules: IMolecule[];
    readonly visibleColumns: string[];
    readonly columnValues: IColumnValues;
}
