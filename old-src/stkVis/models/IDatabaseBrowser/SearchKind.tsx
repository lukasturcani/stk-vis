export const enum SearchKind
{
    SortedBoth = "Sorted Both",
    SortedBuildingBlocks = "Sorted Building Blocks",
    SortedConstructedMolecules = "Sorted Constructed Molecules",
    UnsortedBoth = "Unsorted Both",
    UnsortedBuildingBlocks = "Unsorted Building Blocks",
    UnsortedConstructedMolecules = "Unsorted Constructed Molecules",
}

export type UnsortedSearchKind =
    | SearchKind.UnsortedBoth
    | SearchKind.UnsortedBuildingBlocks
    | SearchKind.UnsortedConstructedMolecules


export type SortedSearchKind =
    | SearchKind.SortedBoth
    | SearchKind.SortedBuildingBlocks
    | SearchKind.SortedConstructedMolecules
