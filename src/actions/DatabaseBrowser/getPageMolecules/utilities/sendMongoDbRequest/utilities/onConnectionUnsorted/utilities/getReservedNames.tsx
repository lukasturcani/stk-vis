import {
    SearchKind,
} from '../../../../../../../../models';


interface OptionsBase
{
    kind:
        SearchKind.UnsortedBuildingBlocks
        | SearchKind.UnsortedConstructedMolecules
        | SearchKind.UnsortedBoth;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
}


interface SelectBoth extends OptionsBase
{
    kind: SearchKind.UnsortedBoth;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        SearchKind.UnsortedBuildingBlocks
        |
        SearchKind.UnsortedConstructedMolecules;
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
        ]);

    switch (options.kind)
    {
        case SearchKind.UnsortedBuildingBlocks:
        case SearchKind.UnsortedConstructedMolecules:
            break;

        case SearchKind.UnsortedBoth:
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
