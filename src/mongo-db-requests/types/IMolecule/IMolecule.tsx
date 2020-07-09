import { IMoleculeKeys } from './IMoleculeKeys';
import { IPositionMatrix } from './IPositionMatrix';
import { IPropertyValues } from './IPropertyValues';
import { IAtom } from './IAtom';
import { IBond } from './IBond';


export interface IMolecule
{
    keys: IMoleculeKeys;
    positionMatrix: IPositionMatrix;
    propertyValues: IPropertyValues;
    atoms: IAtom[];
    bonds: IBond[];
}
