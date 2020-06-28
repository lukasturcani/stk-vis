import {
    Maybe,
    Just,
    Nothing,
    MaybeKind,
} from '../../../../utilities';
import {
    IMolecule,
} from '../../../../models';
import * as Kekule from 'kekule';

console.log(Kekule);


export function getSmiles(molecule: IMolecule): Maybe<string>
{
    return new Just('CCCCC');
}
