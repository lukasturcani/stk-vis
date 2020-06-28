import { IDatabaseData } from './IDatabaseData';
import {
    Maybe,
    MaybeKind,
} from '../../../../../../../../../../utilities';
import { IPropertyResults } from './IPropertyResults';
import { getMoleculeId } from './getMoleculeId';


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

                const moleculeId: Maybe<number>
                    = getMoleculeId(data, value);

                switch(moleculeId.kind)
                {
                    case MaybeKind.Just:
                        data.molecules[moleculeId.value] = {
                            positionMatrix: value['m'],
                            ...data.molecules[moleculeId.value],
                        }
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
            assertNever(positionMatrices);
    }
}



function assertNever(arg: never): never { throw Error(); }
