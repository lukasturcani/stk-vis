module Internal.NonEmptyList exposing
    ( NonEmptyList
    , length
    , map
    , new
    , singleton
    , toList
    )

import List


type NonEmptyList a
    = NonEmptyList a (List a)


new : a -> List a -> NonEmptyList a
new =
    NonEmptyList


length : NonEmptyList a -> Int
length (NonEmptyList _ list) =
    1 + List.length list


singleton : a -> NonEmptyList a
singleton x =
    NonEmptyList x []


map : (a -> b) -> NonEmptyList a -> NonEmptyList b
map f (NonEmptyList x xs) =
    NonEmptyList (f x) (List.map f xs)


toList : NonEmptyList a -> List a
toList (NonEmptyList x xs) =
    x :: xs
