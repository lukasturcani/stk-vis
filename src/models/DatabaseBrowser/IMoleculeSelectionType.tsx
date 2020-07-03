export const enum MoleculeSelectionTypeKind
{
    Both = "Both",
    BuildingBlocks = "Building Blocks",
    ConstructedMolecules = "Constructed Molecules",
    None = "None",
}



export interface ISelectBoth
{
    kind: MoleculeSelectionTypeKind.Both;
}


export interface ISelectNone
{
    kind: MoleculeSelectionTypeKind.None;
}


export interface ISelectBuildingBlocks
{
    kind: MoleculeSelectionTypeKind.BuildingBlocks;
}


export interface ISelectConstructedMolecules
{
    kind: MoleculeSelectionTypeKind.ConstructedMolecules;
}


export type IMoleculeSelectionType =
    | ISelectBoth
    | ISelectBuildingBlocks
    | ISelectConstructedMolecules
    | ISelectNone
