import { SortedType } from './ISortedLoadedDatabaseBrowser';


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
    sortedType: SortedType;
}


export type ISortSettings =
    | UnsortedSettings
    | SortCollectionSettings
