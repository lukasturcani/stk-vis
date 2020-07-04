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
            break;
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            break;
        case MoleculeSelectionTypeKind.Both:
            break;
        case MoleculeSelectionTypeKind.None:
            break;
        default:
            assertNever(selectionType);
    }
    return 1;
}


function assertNever(arg: never): never { throw Error(); }
