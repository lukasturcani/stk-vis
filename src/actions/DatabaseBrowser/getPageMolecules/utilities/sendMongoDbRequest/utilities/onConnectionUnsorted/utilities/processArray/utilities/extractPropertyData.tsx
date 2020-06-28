import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import { IDatabaseData } from './IDatabaseData';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeId } from './getMoleculeId';


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
                    const moleculeId: Maybe<number>
                        = getMoleculeId(data, value);

                    switch(moleculeId.kind)
                    {
                        case MaybeKind.Just:
                        data.columnValues[
                            propertyResults.value.collectionName
                        ][
                            moleculeId.value
                        ] = value['v'];
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
