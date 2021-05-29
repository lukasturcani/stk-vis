exports._toEntry
    = helpers => moleculeKey => entry =>
{
    const key = entry[moleculeKey];
    if (key === undefined)
    {
        return [];
    }

    const value = entry['v'];
    if (value === undefined)
    {
        return [];
    }

    return helpers.tuple(key)(value.toString());
};
