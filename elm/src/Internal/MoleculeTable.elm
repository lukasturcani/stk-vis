module Internal.MoleculeTable exposing
    ( Style
    , view
    )

import Element
import Internal.Molecule as Molecule
import Internal.Picker as Picker
import Widget
import Widget.Material as Material


type alias Style msg =
    { palette : Material.Palette
    , itemStyle : Widget.ItemStyle (Widget.FullBleedItemStyle msg) msg
    }


view :
    Style msg
    -> Picker.Picker Molecule.Molecule
    -> Element.Element msg
view style _ =
    Material.fullBleedItem
        style.palette
        style.itemStyle
