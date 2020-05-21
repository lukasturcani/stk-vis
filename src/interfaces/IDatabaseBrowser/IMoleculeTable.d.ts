/// <reference path="../base.d.ts" />


interface IMoleculeTable {
    getValue(column: string, moleculeId: number): IMaybe<string>;
    getVisibleColumns(): string[];
    getMoleculeIds(): number[];
}
