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
            };

        case MoleculeSelectionTypeKind.Both:
            return {};

        case MoleculeSelectionTypeKind.None:
            return {
            };

        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
