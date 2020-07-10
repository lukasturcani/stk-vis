export type IMoleculeDataQuery = Record<any, unknown>;


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
