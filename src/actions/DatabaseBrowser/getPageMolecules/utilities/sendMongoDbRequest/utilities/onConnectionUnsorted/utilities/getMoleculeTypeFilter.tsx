import {
    MoleculeSelectionTypeKind,
} from '../../../../../../../../models';


export function getMoleculeTypeFilter(
    selectionType: MoleculeSelectionTypeKind,
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
            ];

        case MoleculeSelectionTypeKind.Both:
            return []

        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
