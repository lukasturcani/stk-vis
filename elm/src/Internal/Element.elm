module Internal.Element exposing
    ( Element(..)
    , atomicNumber
    , fromAtomicNumber
    )


type Element
    = H


atomicNumber : Element -> Int
atomicNumber element =
    case element of
        H ->
            1


fromAtomicNumber : Int -> Maybe Element
fromAtomicNumber n =
    case n of
        1 ->
            Just H

        _ ->
            Nothing
