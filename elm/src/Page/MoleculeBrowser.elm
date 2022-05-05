module Page.MoleculeBrowser exposing
    ( Model
    , Msg
    , init
    , subscriptions
    , update
    , view
    )

import Browser
import Element
import Html



-- MODEL


type alias Model =
    { value : Int
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { value = 12 }
    , Cmd.none
    )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "StkVis"
    , body = [ Element.layout [] (Element.text "MoleculeBrowser") ]
    }



-- UPDATE


type Msg
    = Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
