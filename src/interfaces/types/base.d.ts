declare enum MaybeKind {
    Nothing = 'Nothing',
    Just = 'Just',
}


interface IJust<T> {
    kind: MaybeKind.Just;
    value: T;
}


interface INothing {
    kind: MaybeKind.Nothing;
}


type IMaybe<T> = INothing | IJust<T>
