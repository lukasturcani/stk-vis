exports.toPositionMatrixEntryImpl
    = helpers => moleculeKey => entry =>
{
    const result = {};

    const key = entry[moleculeKey];
    if (key === undefined)
    {
        return helpers.nothing;
    }
    result['key'] = key;

    const matrix = entry['m'];
    if (!Array.isArray(matrix))
    {
        return helpers.nothing;
    }
    else
    {
        const resultMatrix = [];
        for (const row of matrix)
        {
            if (
                !Array.isArray(row)
                ||
                row.length !== 3
                ||
                typeof row[0] !== 'number'
                ||
                typeof row[1] !== 'number'
                ||
                typeof row[2] !== 'number'
            ) {
                return helpers.nothing;
            }
            else
            {
                const [x, y, z] = row;
                resultMatrix.push(helpers.position(x)(y)(z));
            }
        }
        result['matrix'] = resultMatrix;
        return helpers.just(result);
    }
};
