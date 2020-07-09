import { IPositionMatrix } from './IPositionMatrix';
import { IPartialMolecule } from './IPartialMolecule';

export interface IMolecule
extends IPartialMolecule
{
    positionMatrix: IPositionMatrix;
}
