export const enum MaybeKind {
    Nothing = 'Nothing',
    Just = 'Just',
}


export interface Just<T> {
    kind: MaybeKind.Just;
    readonly value: T;
}


export interface Nothing {
    kind: MaybeKind.Nothing;
}


export type Maybe<T> = Nothing | Just<T>
