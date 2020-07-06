import {
    Maybe,
    Just,
    Nothing,
} from '../../../../utilities';
import {
    IMoleculeSelectionType,
    MoleculeSelectionTypeKind,
} from '../../../../models';


export function getMoleculeSelectionType(
    selectBuildingBlocks: boolean,
    selectConstructedMolecules: boolean,
)
    : Maybe<IMoleculeSelectionType>
{
    if (selectBuildingBlocks && selectConstructedMolecules)
    {
        return new Just({
            kind: MoleculeSelectionTypeKind.Both,
        });
    }
    else if (selectBuildingBlocks)
    {
        return new Just({
            kind: MoleculeSelectionTypeKind.BuildingBlocks,
        });
    }
    else if (selectConstructedMolecules)
    {
        return new Just({
            kind: MoleculeSelectionTypeKind.ConstructedMolecules,
        });
    }
    else
    {
        return new Nothing();
    }

}
