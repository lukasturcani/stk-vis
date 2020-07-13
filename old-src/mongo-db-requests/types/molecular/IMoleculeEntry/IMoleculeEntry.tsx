import { IAtomEntry } from './IAtomEntry';
import { IBondEntry } from './IBondEntry';


export interface IMoleculeEntry
{
    a: IAtomEntry[];
    b: IBondEntry[];
}
