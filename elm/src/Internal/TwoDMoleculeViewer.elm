module Internal.TwoDMoleculeViewer exposing (view)

import Element exposing (Element)
import Html
import Html.Attributes as Attributes
import Internal.Molecule as Molecule exposing (Molecule)


view : Molecule -> Element msg
view molecule =
    Html.node "two-d-viewer"
        [ Attributes.property "molecule" (Molecule.toJson molecule) ]
        []
        |> Element.html
