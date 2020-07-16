import {
    IMolecule,
} from '../types/IMolecule';
import {
    IPartialMolecule,
} from '../types/IPartialMolecule';
import {
    IPositionMatrix,
} from '../types/IPositionMatrix';
import {
    IPositionMatrixEntry,
} from '../types/IPositionMatrixEntry';

interface IModifiedMolecule
extends IPartialMolecule
{
    positionMatrix?: IPositionMatrix;
}



export function addPositionMatrices(
    moleculeKey: string,
    molecules: Map<string, IPartialMolecule>,
)
    : (entries: IPositionMatrixEntry[]) =>  IMolecule[]
{
    return (entries: IPositionMatrixEntry[]) =>
    {
        const modified: IMolecule[]
            = [];

        for (const entry of entries)
        {
            const molecule: IModifiedMolecule
                = molecules.get(entry.key) as IModifiedMolecule;

            molecule.positionMatrix = entry.m;
            modified.push(molecule as IMolecule);

        }

        return modified;
    };
}
