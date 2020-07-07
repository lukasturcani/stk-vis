import {
    SearchKind,
} from '../../../../../../../../models';


export function getMoleculeTypeFilter(
    selectionType:
        SearchKind.UnsortedBuildingBlocks
        | SearchKind.UnsortedConstructedMolecules
        | SearchKind.UnsortedBoth,
    moleculeKey: string,
    constructedMoleculeCollection: string,
)
    : any
{
    switch (selectionType)
    {
        case SearchKind.UnsortedBuildingBlocks:
            return [
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
                    '$match': {
                        '$expr': {
                            '$eq': [
                                {'$size': '$constructedMolecule'},
                                0,
                            ],
                        },
                    },
                },
            ];

        case SearchKind.UnsortedConstructedMolecules:
            return [
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
                    '$match': {
                        '$expr': {
                            '$gt': [
                                {'$size': '$constructedMolecule'},
                                0,
                            ],
                        },
                    },
                },
            ];

        case SearchKind.UnsortedBoth:
            return []

        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
