exports.toUncheckedMoleculeEntry = helpers => moleculeKey => entry =>
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
        return helpers.nothing;
    }
    result['bonds'] = bonds;

    const key = entry[moleculeKey];
    if (key === undefined)
    {
        return helpers.nothing;
    }
    result['key'] = key;

    return helpers.just(result);
}
