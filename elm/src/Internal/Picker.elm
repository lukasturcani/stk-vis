module Internal.Picker exposing
    ( Picker
    , new
    , pick
    , picked
    , singleton
    , toList
    )

import Array


type Picker a
    = Picker a (Array.Array a)


new : List a -> a -> List a -> Picker a
new first x rest =
    List.concat [ first, [ x ], rest ]
        |> Array.fromList
        |> Picker x


singleton : a -> Picker a
singleton value =
    Picker value (Array.repeat 1 value)


picked : Picker a -> a
picked (Picker x _) =
    x


pick : Int -> Picker a -> Maybe (Picker a)
pick idx (Picker _ xs) =
    Array.get idx xs
        |> Maybe.map (\item -> Picker item xs)


toList : Picker a -> List a
toList (Picker _ xs) =
    Array.toList xs
