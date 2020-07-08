import {
    IColumnValues,
    IAtom,
    IBond,
    IMoleculeKeys,
    number3,
} from '../../../../../../../../../../models';
import { IMoleculeIds } from './IMoleculeIds';


type Mutable<T> = {
    [K in keyof T]: Mutable<T[K]>;
}


export interface IDatabaseMolecule
{
    atoms: IAtom[];
    bonds: IBond[];
    keys: IMoleculeKeys;
    positionMatrix?: number3[];
}


export interface IDatabaseData
{
    columnValues: Mutable<IColumnValues>;
    moleculeIds: IMoleculeIds;
    moleculeKeyNames: Set<string>;
    molecules: IDatabaseMolecule[];
}
