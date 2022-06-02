module Internal.Picker exposing
    ( Picker
    , picker
    , selected
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


selected : Picker a -> a
selected (Picker _ x _) =
    x
