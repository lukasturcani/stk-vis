exports.query =
    moleculeKey =>
    queryCollection =>
    isAscending => [
        {
            '$match': {
                [moleculeKey]: {
                    '$exists': true,
                }
            }
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
                'as': 'positionMatrix1',
            },
        },
        {
            '$sort': {
                'v': (isAscending)? 1 : -1,
            }
        },
    ];
