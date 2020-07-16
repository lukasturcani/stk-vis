import {
    IMolecule,
    IPartialMolecule,
    IPositionMatrix,
    IPositionMatrixEntry,
    IPartialMolecules,
} from '../types';


interface IModifiedMolecule
extends IPartialMolecule
{
    positionMatrix?: IPositionMatrix;
}



export function addPositionMatrices(
    moleculeKey: string,
    molecules: IPartialMolecules,
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
                = (
                    molecules.get((entry[moleculeKey] as string)) as
                    IModifiedMolecule
                );

            molecule.positionMatrix = entry.m;
            modified.push(molecule as IMolecule);

        }

        return modified;
    };
}
