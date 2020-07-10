import { IValueEntry } from './IValueEntry';


export interface ISortedEntry
{
    key: string;
    value: IValueEntry,
}


export interface ISortedEntries
{
    collection: string;
    items: ISortedEntry[]
}
