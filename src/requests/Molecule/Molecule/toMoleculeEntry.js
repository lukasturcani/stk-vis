exports.toUncheckedMoleculeEntry = helpers => entry =>
{
    const result = {};

    const atoms = entry['a'];
    if (!Array.isArray(atoms))
    {
        return helpers.nothing;
    }
    result['atoms'] = atoms;

    const bonds = entry['b'];
    if (!Array.isArray(bonds))
    {
        return helpers.nothing
    }
    result['bonds'] = bonds;

    let keys = helpers.empty;
    for (const entry_ of Object.entries(entry))
    {
        const [key, value] = entry_;

        if (
            key !== 'a'
            &&
            key !== 'b'
            &&
            key !== '_id'
            &&
            typeof value === 'string'
        ){
            keys = helpers.insert(key)(value)(keys);
        }
    }
    result['keys'] = keys;
    return helpers.just(result);
}
