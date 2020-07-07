import {
    SearchKind,
} from '../../../../../../../../models';


interface OptionsBase
{
    kind:
        SearchKind.SortedBuildingBlocks
        | SearchKind.SortedConstructedMolecules
        | SearchKind.SortedBoth;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    constructedMoleculeCollection: string;
    sortedCollection: string;
}


interface SelectBoth extends OptionsBase
{
    kind: SearchKind.SortedBoth;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        SearchKind.SortedBuildingBlocks
        |
        SearchKind.SortedConstructedMolecules;
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
        case SearchKind.SortedBuildingBlocks:
        case SearchKind.SortedConstructedMolecules:
            break;

        case SearchKind.SortedBoth:
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
