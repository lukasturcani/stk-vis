declare module 'RequestManager.SortType'
{
    export type ISortType = Record<string, unknown>;
    export const ascending: ISortType;
    export const descending: ISortType;
}
