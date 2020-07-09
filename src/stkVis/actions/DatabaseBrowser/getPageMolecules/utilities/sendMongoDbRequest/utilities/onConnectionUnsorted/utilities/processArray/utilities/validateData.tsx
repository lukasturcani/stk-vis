import {
    IDatabaseData,
    IValidatedDatabaseData,
    IDatabaseMolecule
} from './IDatabaseData';
import {
    IMolecule,
} from '../../../../../../../../../../models';


export function validateData(
    data: IDatabaseData,
)
    : IValidatedDatabaseData
{
    const result: IValidatedDatabaseData
        = {
            columnValues: {},
            molecules: [],
        };

    for (const columnName of Object.keys(data.columnValues))
    {
        result.columnValues[columnName] = {};
    }

    const oldMolecules: IDatabaseMolecule[]
        = data.molecules;

    const newMolecules: IMolecule[]
        = result.molecules;

    for (let oldId = 0; oldId < oldMolecules.length; oldId++)
    {
        const molecule: IDatabaseMolecule
            = oldMolecules[oldId];

        if (molecule.positionMatrix !== undefined)
        {
            const newId: number
                = newMolecules.length;

            newMolecules.push({
                atoms: molecule.atoms,
                bonds: molecule.bonds,
                positionMatrix: molecule.positionMatrix,
                keys: molecule.keys,
            });

            for (
                const [columnName, column]
                of Object.entries(data.columnValues))
            {
                result.columnValues[columnName][newId] = column[oldId];
            }

        }
    }
    return result;
}
