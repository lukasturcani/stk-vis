import {
    IMolecule,
    IColumnValues,
} from '../../../../../../../../../../models';
import { IMoleculeIds } from './IMoleculeIds';


type Mutable<T> = {
    [K in keyof T]: Mutable<T[K]>;
}


export interface IDatabaseData
{
    columnValues: Mutable<IColumnValues>;
    moleculeIds: IMoleculeIds;
    moleculeKeyNames: Set<string>;
    molecules: IMolecule[];
}
