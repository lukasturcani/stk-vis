exports._toTuple = tuple => moleculeKey => entry =>
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

    return [tuple(key)(value.toString())];
};
