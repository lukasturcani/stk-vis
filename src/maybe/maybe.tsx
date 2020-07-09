export const enum MaybeKind {
    Nothing = 'Nothing',
    Just = 'Just',
}


export class Just<T> {
    kind: MaybeKind.Just = MaybeKind.Just;
    constructor(readonly value: T) {}
}


export class Nothing {
    kind: MaybeKind.Nothing = MaybeKind.Nothing;
    constructor() {}
}


export type Maybe<T> = Nothing | Just<T>;


export function isJust<T>(
    value: Maybe<T>,
)
    : value is Just<T>
{
    return value.kind === MaybeKind.Just;
}


export function getValue<T>(
    value: Just<T>,
)
    : T
{
    return value.value;
}
