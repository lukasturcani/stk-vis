import {
    IPositionMatrix,
} from 'mongo-db-requests/types/IPositionMatrix';
import {
    IPartialMolecule,
} from 'mongo-db-requests/types/IPartialMolecule';


export interface IMolecule
extends IPartialMolecule
{
    positionMatrix: IPositionMatrix;
}
