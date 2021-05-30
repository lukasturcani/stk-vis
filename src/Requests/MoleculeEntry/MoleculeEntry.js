exports._fromEntry = helpers => moleculeKey => entry =>
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

    const constructed = entry['constructedMolecule'];
    if (constructed === undefined)
    {
        return helpers.nothing;
    }
    result['constructed'] = constructed.length > 0;

    if (
        entry['positionMatrix'] !== undefined
        && entry['positionMatrix'][0] !== undefined
        && entry['positionMatrix'][0]['m'] !== undefined
    ) {
        const positionMatrix = entry['positionMatrix'][0]['m'];
        result['positionMatrix'] = positionMatrix
        return helpers.just(result);
    }
    if (
        entry['positionMatrix1'] !== undefined
        && entry['positionMatrix1'][0] !== undefined
        && entry['positionMatrix1'][0]['m'] !== undefined
    ) {
        const positionMatrix = entry['positionMatrix1'][0]['m'];
        result['positionMatrix'] = positionMatrix
        return helpers.just(result);
    }
    if (
        entry['positionMatrix2'] !== undefined
        && entry['positionMatrix2'][0] !== undefined
        && entry['positionMatrix2'][0]['m'] !== undefined
    ) {
        const positionMatrix = entry['positionMatrix2'][0]['m'];
        result['positionMatrix'] = positionMatrix
        return helpers.just(result);
    }

    return helpers.nothing;
}
