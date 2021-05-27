exports.query =
    moleculeKey =>
    queryCollection =>
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
            '$match': {
                '$expr': {
                    '$and': [
                        {
                            '$gt': [
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
                    ],
                },
            },
        }
    ];
