import { IPartialMolecules } from '../types';


export type IMoleculeDataQuery = Record<any, unknown>;


export function getMoleculeDataQuery(
    moleculeKey: string,
    molecules: IPartialMolecules,
)
    : IMoleculeDataQuery
{
    return {
        [moleculeKey]: {
            $in: Array.from(molecules.keys()),
        },
    };
}
