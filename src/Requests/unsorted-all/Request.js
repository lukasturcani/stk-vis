exports.query = moleculeKey => collection => [
    {
        '$match': {
            [moleculeKey]: {
                '$exists': true,
            },
        },
    },
    {
        '$lookup': {
            'from': collection,
            'localField': moleculeKey,
            'foreignField': moleculeKey,
            'as': 'constructedMolecule',
        },
    }
];
