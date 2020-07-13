import { IMoleculeKeys } from './IMoleculeKeys';
import { IPropertyValues } from './IPropertyValues';
import { IAtom } from './IAtom';
import { IBond } from './IBond';


export interface IPartialMolecule
{
    keys: IMoleculeKeys;
    propertyValues: IPropertyValues;
    atoms: IAtom[];
    bonds: IBond[];
}
