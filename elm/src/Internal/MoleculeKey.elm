module Internal.MoleculeKey exposing
    ( MoleculeKey
    , fromString
    , toString
    )


type MoleculeKey
    = MoleculeKey String


toString : MoleculeKey -> String
toString (MoleculeKey value) =
    value


fromString : String -> MoleculeKey
fromString =
    MoleculeKey
