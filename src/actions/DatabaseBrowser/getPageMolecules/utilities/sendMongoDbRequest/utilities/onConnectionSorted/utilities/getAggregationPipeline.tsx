import {
    MoleculeSelectionTypeKind,
    SortType,
} from '../../../../../../../../models';


export function getAggregationPipeline(
    selectionType: MoleculeSelectionTypeKind,
    sortType: SortType,
    moleculeKey: string,
    constructedMoleculeCollection: string,
)
    : any
{
    switch (selectionType)
    {
        case MoleculeSelectionTypeKind.BuildingBlocks:
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
                {
                    '$sort': {
                        'v': (sortType === SortType.Ascending)? 1 : -1,
                    }
                },
            ];

        case MoleculeSelectionTypeKind.ConstructedMolecules:
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
                {
                    '$sort': {
                        'v': (sortType === SortType.Ascending)? 1 : -1,
                    }
                },
            ];

        case MoleculeSelectionTypeKind.Both:
            return [
                {
                    '$sort': {
                        'v': (sortType === SortType.Ascending)? 1 : -1,
                    }
                },
            ];

        default:
            assertNever(selectionType);

    }
}



function assertNever(arg: never): never { throw Error(); }
