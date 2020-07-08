import { PageKind } from './PageKind';


export type number3 = [number, number, number];


export interface IBond
{
    atom1Id: number;
    atom2Id: number;
}


export interface IAtom
{
    atomicNumber: number;
}


export interface IMoleculeKeys
{
    [keyName: string]: string;
}

export interface IMolecule {
    atoms: IAtom[];
    bonds: IBond[];
    keys: IMoleculeKeys;
    positionMatrix: number3[]
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
    readonly pageIndex: number;
    readonly pageKind: PageKind;
    readonly propertyCollections: string[];
}


export interface IMoleculeTable {
    readonly molecules: IMolecule[];
    readonly visibleColumns: string[];
    readonly columnValues: IColumnValues;
}
