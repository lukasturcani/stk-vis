import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import { IDatabaseData } from './IDatabaseData';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeIds } from './getMoleculeId';


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
                data.columnValues[propertyResults.value.collectionName]
                    = {};

                for (
                    const value of propertyResults.value.propertyValues
                ) {
                    const moleculeIds: Maybe<number[]>
                        = getMoleculeIds(data, value);

                    switch(moleculeIds.kind)
                    {
                        case MaybeKind.Just:
                            for (const moleculeId of moleculeIds.value)
                            {
                                data.columnValues[
                                    propertyResults.value.collectionName
                                ][moleculeId] = value['v'];
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

            default:
                assertNever(propertyResults)
                break;

        }
        return propertyResults;
    };
}
