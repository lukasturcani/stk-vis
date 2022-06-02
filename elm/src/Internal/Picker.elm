module Internal.Picker exposing
    ( Picker
    , picker
    , singleton
    )


type Picker a
    = Picker (List a) a (List a)


picker : List a -> a -> List a -> Picker a
picker =
    Picker

singleton : a -> Picker a
singleton value = Picker [] value []
