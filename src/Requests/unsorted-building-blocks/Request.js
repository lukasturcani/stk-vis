exports.query =
    moleculeKey =>
    constructedMoleculeCollection =>
    positionMatrixCollection =>
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
                'as': 'positionMatrix',
            },
        },
        {
            '$match': {
                '$expr': {
                    '$and': [
                        {
                            '$eq': [
                                {'$size': '$constructedMolecule'},
                                0,
                            ],
                        },
                        {
                            '$gt': [
                                {'$size': '$positionMatrix'},
                                0
                            ],
                        }
                    ]
                },
            },
        }
    ];
