declare module 'RequestManager.SetSorted'
{
    import { SortType } from 'RequestManager.SortType';

    export type SetSorted = Record<string, unknown>;
    export const setSorted:
        (collection: string) => (sortType: SortType) => SetSorted;
}
