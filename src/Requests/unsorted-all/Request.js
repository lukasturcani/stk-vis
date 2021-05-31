exports.query =
    moleculeKey =>
    constructedMoleculeCollection =>
    positionMatrixCollection =>
    buildingBlockPositionMatrixCollection =>
    [
        {
            '$match': {
                [moleculeKey]: {
                    '$exists': true,
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
