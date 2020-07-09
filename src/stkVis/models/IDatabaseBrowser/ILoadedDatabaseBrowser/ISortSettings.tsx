import { SortType } from './SortType';


export const enum SortSettingsKind
{
    Unsorted = 'Unsorted',
    Sorted = 'Sorted',
}

export interface UnsortedSettings
{
    kind: SortSettingsKind.Unsorted;
}


export interface SortCollectionSettings
{
    kind: SortSettingsKind.Sorted;
    collection: string;
    sortType: SortType;
}


export type ISortSettings =
    | UnsortedSettings
    | SortCollectionSettings
