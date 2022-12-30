module Internal.Picker exposing
    ( Picker
    , new
    , pick
    , picked
    , singleton
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
    case Array.get idx xs of
        Just item ->
            Just (Picker item xs)

        Nothing ->
            Nothing
