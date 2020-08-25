exports.dataQuery = keyName => keys => ({
    [keyName]: {
        $in: keys
    }
});

exports.moleculeQuery = keyName => collection => keys => [
    {
        $match: {
            [keyName]: {
                $in: keys
            },
        },
    },
    {
        '$lookup': {
            'from': collection,
            'localField': keyName,
            'foreignField': keyName,
            'as': 'constructedMolecule',
        },
    },
];
