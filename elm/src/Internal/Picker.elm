module Internal.Picker exposing
    ( Picker
    , picked
    , picker
    , singleton
    )


type Picker a
    = Picker (List a) a (List a)


picker : List a -> a -> List a -> Picker a
picker =
    Picker


singleton : a -> Picker a
singleton value =
    Picker [] value []


picked : Picker a -> a
picked (Picker _ x _) =
    x
