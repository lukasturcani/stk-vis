module Internal.MoleculeKeyValue exposing
    ( MoleculeKeyValue
    , fromString
    , toString
    )


type MoleculeKeyValue
    = MoleculeKeyValue String


toString : MoleculeKeyValue -> String
toString (MoleculeKeyValue value) =
    value


fromString : String -> MoleculeKeyValue
fromString =
    MoleculeKeyValue
