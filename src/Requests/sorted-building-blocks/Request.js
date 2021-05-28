exports.query =
    moleculeKey =>
    moleculeCollection =>
    constructedMoleculeCollection =>
    positionMatrixCollection =>
    isAscending =>
    [
        {
            '$match': {
                [moleculeKey]: {
                    '$exists': true,
                }
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
                'as': 'positionMatrix',
            },
        },
        {
            '$match': {
                '$expr': {
                    '$and': [
                        {
                            '$gt': [
                                {'$size': '$molecule'},
                                0,
                            ],
                        },
                        {
                            '$eq': [
                                {'$size': '$constructedMolecule'},
                                0,
                            ],
                        },
                        {
                            '$gt': [
                                {'$size': '$positionMatrix'},
                                0,
                            ],
                        }
                    ]
                },
            },
        },
        {
            '$sort': {
                'v': (isAscending)? 1 : -1,
            }
        }
    ];
