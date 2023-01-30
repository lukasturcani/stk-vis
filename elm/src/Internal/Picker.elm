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
    = Picker ( Int, a ) (Array.Array a)


new : List a -> a -> List a -> Picker a
new first x rest =
    List.concat [ first, [ x ], rest ]
        |> Array.fromList
        |> Picker ( List.length first, x )


singleton : a -> Picker a
singleton value =
    Picker ( 0, value ) (Array.repeat 1 value)


picked : Picker a -> ( Int, a )
picked (Picker x _) =
    x


pick : Int -> Picker a -> Maybe (Picker a)
pick idx (Picker _ xs) =
    Array.get idx xs
        |> Maybe.map (\item -> Picker ( idx, item ) xs)


toList : Picker a -> List a
toList (Picker _ xs) =
    Array.toList xs
