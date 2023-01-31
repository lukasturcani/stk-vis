module Page.WaitingForMolecules exposing (Model, view)

import Browser exposing (Document)
import Element



-- MODEL


type alias Model =
    { columns : List String }



-- VIEW


view : Document msg
view =
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
                [ Element.text "NOTHING"
                ]
            )
        ]
    }
