import { IMoleculeDataQuery } from './IMoleculeDataQuery';


export function getMoleculeDataQuery(
    keyName: string,
    keys: string[],
)
    : IMoleculeDataQuery
{
    return {
        [keyName]: {
            $in:  keys,
        },
    };
}
