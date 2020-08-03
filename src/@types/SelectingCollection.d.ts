declare module 'SelectingCollection'
{
    export type SelectingCollection<T> = Record<string, unknown>;
    export const selectingCollection:
        <T>(previous: T[]) =>
        <T>(selected: T) =>
        <T>(next: T[]) =>
        SelectingCollection<T>;
}
