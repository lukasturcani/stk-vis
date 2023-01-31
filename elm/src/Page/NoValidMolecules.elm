module Page.NoValidMolecules exposing (Model, view)

import Browser exposing (Document)
import Element


type alias Model =
    { decodingErrors : List String, columns : List String }


view : Model -> Document msg
view model =
    { title = "StkVis"
    , body =
        [ Element.layout
            [ Element.width Element.fill
            , Element.height Element.fill
            ]
            (Element.column
                [ Element.width Element.fill
                , Element.height Element.fill
                ]
                (List.map Element.text model.decodingErrors)
            )
        ]
    }
