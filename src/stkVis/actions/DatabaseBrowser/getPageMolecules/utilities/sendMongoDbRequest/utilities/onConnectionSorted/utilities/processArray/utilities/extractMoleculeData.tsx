import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import {
    IMolecule,
} from '../../../../../../../../../../models';
import { IDatabaseData } from './IDatabaseData';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeIds } from './getMoleculeIds';
import { IDbEntry } from './IDbEntry';


function assertNever(arg: never): never { throw Error(); }


export function extractMoleculeData(
    data: IDatabaseData,
)
    : (r: Maybe<IPropertyResults>) => Maybe<IPropertyResults>
{
    return (
        propertyResults: Maybe<IPropertyResults>,
    )
        : Maybe<IPropertyResults> =>
    {
        switch (propertyResults.kind)
        {
            case MaybeKind.Nothing:
                data.molecules = [];
                break;

            case MaybeKind.Just:
                const values = propertyResults.value.propertyValues;
                data.molecules = Array(values.length).fill(undefined);

                for (const value of values)
                {
                    const moleculeIds: Maybe<number[]>
                        = getMoleculeIds(data, value);

                    switch(moleculeIds.kind)
                    {
                        case MaybeKind.Just:
                            for (const moleculeId of moleculeIds.value)
                            {
                                data.molecules[moleculeId]
                                    = toMolecule(value);
                            }
                            break;

                        case MaybeKind.Nothing:

                            throw Error(
                                'No molecule id was found. This ' +
                                'should never happen.'
                            );
                            break;

                        default:
                            assertNever(moleculeIds);

                    }
                }
                // If there are duplicate molecules, the array
                // will have been over-allocated.
                data.molecules = data.molecules.filter(
                    molecule => molecule !== undefined
                );

                break;

            default:
                assertNever(propertyResults)
                break;

        }
        return propertyResults;
    };
}



function toMolecule(entry: IDbEntry): IMolecule
{
    const molecule: any = {};

    for (const [propName, propValue] of Object.entries(entry))
    {
        switch (propName)
        {
            case 'a':
                molecule['atoms'] = propValue;
                break;

            case 'b':
                molecule['bonds'] = propValue;
                break;

            case '_id':
                break;

            default:
                molecule[propName] = propValue;
                break;
        }
    }
    return molecule;
}
