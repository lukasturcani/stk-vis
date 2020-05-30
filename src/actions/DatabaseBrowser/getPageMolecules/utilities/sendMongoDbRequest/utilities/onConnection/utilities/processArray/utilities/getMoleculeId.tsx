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
    for (let [propName, propValue] of Object.entries(result))
    {
        if (
            moleculeIds.hasOwnProperty(propName)
            &&
            moleculeIds[propName].hasOwnProperty(propValue)
        ){
            return new Just(moleculeIds[propName][propValue]);
        }
    }
    return new Nothing()
}
