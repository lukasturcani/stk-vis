export type IAtomEntry = [number];
export type IBondEntry = [number, number, number];


export interface IMoleculeEntry
{
    a: undefined | IAtomEntry[];
    b: undefined | IBondEntry[];
}


export interface IValueEntry
{
    v: undefined | number | string;
}
