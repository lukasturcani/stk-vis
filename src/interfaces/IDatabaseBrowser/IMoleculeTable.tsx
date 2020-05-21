export interface IMoleculeTable {
    getValue(column: string, moleculeId: number): IMaybe<string>;
    getVisibleColumns(): string[];
    getMoleculeIds(): number[];
}
