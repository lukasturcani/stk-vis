import { IPartialMolecule } from '../types';


export type IMoleculeDataQuery = Record<any, unknown>;


export function getMoleculeDataQuery(
    moleculeKey: string,
    molecules: IPartialMolecule[],
)
    : IMoleculeDataQuery
{
    const query: IMoleculeDataQuery
        = {
            [moleculeKey]: {
                $in: [],
            },
        };

    for (const molecule of molecules)
    {
        if (molecule.keys[moleculeKey] !== undefined)
        {
            query[moleculeKey]['$in'].push(molecule.keys[moleculeKey]);
        }
    }

    return query;
}
