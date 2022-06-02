module Internal.MoleculeTable exposing
    ( Style
    , view
    )

import Element
import Internal.Picker as Picker
import Internal.Molecule as Molecule

type alias Style = {}

view : Style -> Picker.Picker Molecule.Molecule -> Element.Element msg
view _ _ = Element.none
