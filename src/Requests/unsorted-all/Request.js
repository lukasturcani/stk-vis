exports.query =
    moleculeKey =>
    queryCollection =>
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
                'from': queryCollection,
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
            '$lookup': {
                'from': buildingBlockPositionMatrixCollection,
                'localField': moleculeKey,
                'foreignField': moleculeKey,
                'as': 'positionMatrix',
            },
        },
        {
            '$match': {
                '$expr': {
                    '$gt': [
                        {'$size': '$positionMatrix'},
                        0
                    ],
                },
            },
        }
    ];
