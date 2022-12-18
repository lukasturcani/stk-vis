module Page.MongoConfig exposing
    ( Model
    , Msg
    , update
    , view
    )

import Browser exposing (Document)
import Element exposing (Element)
import Element.Input as Input



-- MODEL


type alias Model =
    { uri : String
    , database : String
    , collection : String
    , query : String
    }



-- VIEW


view : Model -> Document Msg
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
                [ text "uri" model.uri
                , text "database" model.database
                , text "collection" model.collection
                , text "query" model.query
                ]
            )
        ]
    }


text : String -> String -> Element Msg
text label content =
    Input.text
        []
        { onChange = GotUri
        , text = content
        , placeholder = Nothing
        , label = Input.labelLeft [] (Element.text label)
        }



-- UPDATE


type Msg
    = GotUri String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotUri uri ->
            ( { model | uri = uri }, Cmd.none )
