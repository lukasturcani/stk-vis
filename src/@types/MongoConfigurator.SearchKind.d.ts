declare module 'MongoConfigurator.SearchKind'
{
    export type ISearchKind = Record<string, unknown>;
    export const unsortedAll: ISearchKind;
    export const unsortedBuildingBlocks: ISearchKind;
    export const unsortedConstructedMolecules: ISearchKind;
}
