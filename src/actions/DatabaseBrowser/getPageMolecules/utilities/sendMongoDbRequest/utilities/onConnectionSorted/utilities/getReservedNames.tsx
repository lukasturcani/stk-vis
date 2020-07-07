import {
    MoleculeSelectionTypeKind,
} from '../../../../../../../../models';


interface OptionsBase
{
    kind: MoleculeSelectionTypeKind;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    sortedCollection: string;
}


interface SelectBoth extends OptionsBase
{
    kind: MoleculeSelectionTypeKind.Both;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        MoleculeSelectionTypeKind.BuildingBlocks
        |
        MoleculeSelectionTypeKind.ConstructedMolecules;
}

type Options =
    | SelectBoth
    | SelectOne


export function getReservedNames(
    options: Options,
)
    : Set<string>
{
    const reservedNames: Set<string>
        = new Set([
            options.moleculeCollection,
            options.positionMatrixCollection,
            options.constructedMoleculeCollection,
            options.sortedCollection,
        ]);

    switch (options.kind)
    {
        case MoleculeSelectionTypeKind.BuildingBlocks:
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            break;

        case MoleculeSelectionTypeKind.Both:
            reservedNames.add(
                options.buildingBlockPositionMatrixCollection
            );
            break;

        default:
            assertNever(options);
    }

    return reservedNames;
}


function assertNever(arg: never): never { throw Error(); }
