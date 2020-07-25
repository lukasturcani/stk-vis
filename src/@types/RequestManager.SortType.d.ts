declare module 'RequestManager.SortType'
{
    export type SortType = Record<string, unknown>;
    export const ascending: SortType;
    export const descending: SortType;
}
