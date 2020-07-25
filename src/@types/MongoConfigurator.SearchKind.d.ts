declare module 'MongoConfigurator.SearchKind'
{
    export type SearchKind = Record<string, unknown>;
    export const unsortedAll: SearchKind;
    export const unsortedBuildingBlocks: SearchKind;
    export const unsortedConstructedMolecules: SearchKind;
}
