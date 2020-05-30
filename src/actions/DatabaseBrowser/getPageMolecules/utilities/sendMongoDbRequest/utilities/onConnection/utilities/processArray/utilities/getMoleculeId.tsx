import {
    Maybe,
    Just,
    Nothing,
} from '../../../../../../../../../../utilities';
import { IMoleculeIds } from './IMoleculeIds';
import { IDbEntry } from './IDbEntry';


export function getMoleculeId(
    moleculeIds: IMoleculeIds,
    result: IDbEntry,
)
    : Maybe<number>
{
    for (const [propName, propValue] of Object.entries(result))
    {
        if (
            Object.prototype.hasOwnProperty.call(moleculeIds, propName)
            &&
            Object.prototype.hasOwnProperty.call(
                moleculeIds[propName],
                propValue,
            )
        ){
            return new Just(moleculeIds[propName][propValue]);
        }
    }
    return new Nothing()
}
