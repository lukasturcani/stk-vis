exports._moleculeQuery = keyName => keyValue => ({
    [keyName]: keyValue
});


exports._buildingBlockQuery =
    moleculeKey =>
    constructedMoleculeCollection =>
    positionMatrixCollection =>
    buildingBlockPositionMatrixCollection =>
    buildingBlockKeys =>
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
                'from': constructedMoleculeCollection,
                'localField': moleculeKey,
                'foreignField': moleculeKey,
                'as': 'constructedMolecule',
            },
        },
        {
            '$lookup': {
                'from': positionMatrixCollection,
                'localField': moleculeKey,
                'foreignField': moleculeKey,
                'as': 'positionMatrix1',
            },
        },
        {
            '$lookup': {
                'from': buildingBlockPositionMatrixCollection,
                'localField': moleculeKey,
                'foreignField': moleculeKey,
                'as': 'positionMatrix2',
            },
        },
        {
            '$match': {
                '$expr': {
                    '$or': [
                        {
                            '$gt': [
                                {'$size': '$positionMatrix1'},
                                0
                            ],
                        },
                        {
                            '$gt': [
                                {'$size': '$positionMatrix2'},
                                0
                            ],
                        }
                    ],
                },
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
