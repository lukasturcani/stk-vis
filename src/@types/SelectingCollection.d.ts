declare module 'SelectingCollection'
{
    export type SelectingCollection<T> = Record<string, unknown>;
    export const selectingCollection:
        <T>(previous: T[]) =>
        (selected: T) =>
        (next: T[]) =>
        SelectingCollection<T>;

    export const all: <T>(collection: SelectingCollection<T>) => T[];
}
