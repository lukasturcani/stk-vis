module Internal.MoleculeKeyName exposing
    ( MoleculeKeyName
    , fromString
    , toString
    )


type MoleculeKeyName
    = MoleculeKeyName String


toString : MoleculeKeyName -> String
toString (MoleculeKeyName value) =
    value


fromString : String -> MoleculeKeyName
fromString =
    MoleculeKeyName
