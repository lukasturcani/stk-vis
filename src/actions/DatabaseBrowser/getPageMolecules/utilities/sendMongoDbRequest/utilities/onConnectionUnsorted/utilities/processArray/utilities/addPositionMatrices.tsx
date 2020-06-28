import { IDatabaseData } from './IDatabaseData';
import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeIds } from './getMoleculeIds';


export function addPositionMatrices(
    data: IDatabaseData,
    positionMatrices: Maybe<IPropertyResults>,
)
    : void
{
    switch (positionMatrices.kind)
    {
        case MaybeKind.Nothing:
            throw Error('Position matrix request failed.');
            break;

        case MaybeKind.Just:
            for (
                const value of positionMatrices.value.propertyValues
            ) {

                const moleculeIds: Maybe<number[]>
                    = getMoleculeIds(data, value);

                switch(moleculeIds.kind)
                {
                    case MaybeKind.Just:
                        for (const moleculeId of moleculeIds.value)
                        {
                            data.molecules[moleculeId] = {
                                positionMatrix: value['m'],
                                ...data.molecules[moleculeId],
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

        default:
            assertNever(positionMatrices);
    }
}



function assertNever(arg: never): never { throw Error(); }
