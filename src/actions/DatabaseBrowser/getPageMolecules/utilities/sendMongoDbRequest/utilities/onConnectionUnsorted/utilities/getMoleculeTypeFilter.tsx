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
                c: null,
            };

        case MoleculeSelectionTypeKind.ConstructedMolecules:
            return {
                c: true,
            };

        case MoleculeSelectionTypeKind.Both:
            return {};

        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
