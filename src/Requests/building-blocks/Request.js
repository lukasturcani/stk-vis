exports._moleculeQuery = keyName => keyValue => ({
    [keyName]: keyValue
});


exports._buildingBlockQuery
    = moleculeKey => collection => buildingBlockKeys =>
[
    {
        '$match': {
            [moleculeKey]: {
                $in: buildingBlockKeys,
            },
        },
    },
    {
        '$lookup': {
            'from': collection,
            'localField': moleculeKey,
            'foreignField': moleculeKey,
            'as': 'constructedMolecule',
        },
    }
];

exports._buildingBlockKeys = moleculeKey => entry => {
    const buildingBlocks = entry['BB'];
    if (buildingBlocks === undefined)
    {
        return [];
    }
    return buildingBlocks.map(bbEntry => bbEntry[moleculeKey]);
}
