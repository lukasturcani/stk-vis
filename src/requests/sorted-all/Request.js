exports.query = moleculeKey => isAscending => [
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
    }
];
