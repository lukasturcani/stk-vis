export const enum MaybeKind {
    Nothing = 'Nothing',
    Just = 'Just',
}


export class Just<T> {
    kind: MaybeKind.Just;
    constructor(readonly value: T) {};
}


export class Nothing {
    kind: MaybeKind.Nothing;
    constructor() {};
}


export type Maybe<T> = Nothing | Just<T>
