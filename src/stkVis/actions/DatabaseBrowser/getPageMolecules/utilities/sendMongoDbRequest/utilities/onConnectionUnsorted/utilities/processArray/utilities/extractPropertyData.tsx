import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import { IDatabaseData } from './IDatabaseData';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeIds } from './getMoleculeIds';


function assertNever(arg: never): never { throw Error(); }


export function extractPropertyData(
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
                break;

            case MaybeKind.Just:
            {
                const results = propertyResults.value;

                data.columnValues[results.collectionName] = {};

                const collection
                    = data.columnValues[results.collectionName];

                for (const value of results.propertyValues)
                {
                    const moleculeIds: Maybe<number[]>
                        = getMoleculeIds(data, value);

                    switch(moleculeIds.kind)
                    {
                        case MaybeKind.Just:
                            for (const moleculeId of moleculeIds.value)
                            {
                                if (value.v === undefined)
                                {
                                    continue;
                                }
                                else
                                {
                                    collection[moleculeId]
                                        = value['v'].toString();
                                }
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

                break;
            }

            default:
                assertNever(propertyResults)
                break;

        }
        return propertyResults;
    };
}
