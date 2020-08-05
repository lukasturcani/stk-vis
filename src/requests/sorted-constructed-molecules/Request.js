exports.query = moleculeKey => collection => isAscending => [
    {
        '$match': {
            [moleculeKey]: {
                '$exists': true,
            }
        }
    },
    {
        '$lookup': {
            'from': collection,
            'localField': moleculeKey,
            'foreignField': moleculeKey,
            'as': 'constructedMolecule',
        },
    },
    {
        '$match': {
            '$expr': {
                '$gt': [
                    {'$size': '$constructedMolecule'},
                    0,
                ],
            },
        },
    },
    {
        '$sort': {
            'v': (isAscending)? 1 : -1,
        }
    }
];
