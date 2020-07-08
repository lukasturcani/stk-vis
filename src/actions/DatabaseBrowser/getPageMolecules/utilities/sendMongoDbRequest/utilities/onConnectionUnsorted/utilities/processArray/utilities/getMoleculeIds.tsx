import {
    Maybe,
    Just,
    Nothing,
} from '../../../../../../../../../../utilities';
import { IValueEntry, IPositionMatrixEntry } from './IDbEntries';
import { IDatabaseData } from './IDatabaseData';


export function getMoleculeIds(
    data: IDatabaseData,
    result: IValueEntry | IPositionMatrixEntry,
)
    : Maybe<number[]>
{
    const moleculeIds = data.moleculeIds;
    for (const [key, value] of Object.entries(result))
    {
        if (!data.moleculeKeyNames.has(key))
        {
            continue;
        }
        if (
            Object.prototype.hasOwnProperty.call(moleculeIds, key)
            &&
            Object.prototype.hasOwnProperty.call(
                moleculeIds[key],
                value,
            )
        ){
            return new Just(moleculeIds[key][value]);
        }
    }
    return new Nothing()
}
