import { Maybe } from '../../utilities';


export interface IMolecule {
}


export interface IColumn {
    readonly [moleculeId: number]: string;
}


export interface IMoleculeTable {
    readonly molecules: IMolecule[];
    readonly visibleColumns: { readonly [name: string]: IColumn };
}
