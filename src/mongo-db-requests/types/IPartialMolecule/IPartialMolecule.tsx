import { IAtom } from './IAtom';
import { IBond } from './IBond';


export interface IPartialMolecule
{
    key: string;
    keys: Map<string, string>;
    propertyValues: Map<string, string>;
    atoms: IAtom[];
    bonds: IBond[];
}
