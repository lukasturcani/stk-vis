module Internal.TwoDMoleculeViewer exposing (view)

import Element exposing (Element)
import Html
import Html.Attributes as Attributes
import Json.Encode exposing (Value)


view : Value -> Element msg
view molecule =
    Html.node "two-d-viewer"
        [ Attributes.property "molecule" molecule ]
        []
        |> Element.html
