exports.query =
    moleculeKey =>
    moleculeCollection =>
    constructedMoleculeCollection =>
    positionMatrixCollection =>
    buildingBlockPositionMatrixCollection =>
    isAscending => [
        {
            '$match': {
                [moleculeKey]: {
                    '$exists': true,
                }
            }
        },
        {
            '$sort': {
                'v': (isAscending)? 1 : -1,
            }
        },
        {
            '$lookup': {
                'from': moleculeCollection,
                'localField': moleculeKey,
                'foreignField': moleculeKey,
                'as': 'molecule',
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
                    '$and': [
                        {
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
                        {
                            '$gt': [
                                {'$size': '$molecule'},
                                0
                            ],
                        },
                    ]
                },
            },
        }
    ];
