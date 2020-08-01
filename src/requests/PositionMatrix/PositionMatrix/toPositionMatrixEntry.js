module.exports = helpers => moleculeKey => entry =>
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
        }
    }
    result['matrix'] = matrix;
};
