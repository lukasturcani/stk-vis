import {
    Maybe,
    Just,
    Nothing,
} from '../../../../../../../../../../utilities';
import { IDbEntry } from './IDbEntry';
import { IDatabaseData } from './IDatabaseData';


export function getMoleculeId(
    data: IDatabaseData,
    result: IDbEntry,
)
    : Maybe<number>
{
    const moleculeIds = data.moleculeIds;
    const keyNames: string[] = Object.keys(result).filter(
        propName => data.moleculeKeyNames.has(propName)
    );
    for (const keyName of keyNames)
    {
        const keyValue: string = result[keyName];
        if (
            Object.prototype.hasOwnProperty.call(moleculeIds, keyName)
            &&
            Object.prototype.hasOwnProperty.call(
                moleculeIds[keyName],
                keyValue,
            )
        ){
            return new Just(moleculeIds[keyName][keyValue]);
        }
    }
    return new Nothing()
}
