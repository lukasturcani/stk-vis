import {
    MoleculeSelectionTypeKind,
} from '../../../../../../../../models';


export function getMoleculeTypeFilter(
    selectionType: MoleculeSelectionTypeKind,
)
    : any
{
    switch (selectionType)
    {
        case MoleculeSelectionTypeKind.BuildingBlocks:
            return {
            };

        case MoleculeSelectionTypeKind.ConstructedMolecules:
            return {
                '$lookup': {
                    'from': constructedMoleculeCollection,
                    localField: '',
                    foreignField: '',
                    'as': '',
                },
            };

        case MoleculeSelectionTypeKind.Both:
            return {};

        case MoleculeSelectionTypeKind.None:
            // This should probably be changed so that it doesn't match
            // anything.
            return {};

        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
