import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import {
    IMolecule,
} from '../../../../../../../../../../models';
import { IDatabaseData } from './IDatabaseData';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeId } from './getMoleculeId';
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
        data.molecules = [];

        switch (propertyResults.kind)
        {
            case MaybeKind.Nothing:
                break;

            case MaybeKind.Just:
                for (
                    const value of propertyResults.value.propertyValues
                ) {
                    const moleculeId: Maybe<number>
                        = getMoleculeId(data, value);

                    switch(moleculeId.kind)
                    {
                        case MaybeKind.Just:
                            data.molecules.push(toMolecule(value));
                            break;

                        case MaybeKind.Nothing:

                            throw Error(
                                'No molecule id was found. This ' +
                                'should never happen.'
                            );
                            break;

                        default:
                            assertNever(moleculeId);

                    }
                }

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
