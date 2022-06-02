module Internal.Elements exposing
    ( Element(..)
    , atomicNumber
    )


type Element
    = H


atomicNumber : Element -> Int
atomicNumber element =
    case element of
        H ->
            1
