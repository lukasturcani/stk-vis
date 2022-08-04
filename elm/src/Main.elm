module Main exposing (main)

import Browser
import Element
import Html
import Page.MoleculeBrowser as MoleculeBrowser



-- MAIN


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type Model
    = MoleculeBrowser MoleculeBrowser.Model


init : () -> ( Model, Cmd Msg )
init flags =
    let
        ( moleculeBrowser, cmds ) =
            MoleculeBrowser.init flags
    in
    ( MoleculeBrowser moleculeBrowser
    , Cmd.map MsgMoleculeBrowser cmds
    )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    case model of
        MoleculeBrowser moleculeBrowser ->
            let
                { title, body } =
                    MoleculeBrowser.view moleculeBrowser
            in
            { title = title
            , body = List.map (Html.map MsgMoleculeBrowser) body
            }



-- UPDATE


type Msg
    = MsgMoleculeBrowser MoleculeBrowser.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( MsgMoleculeBrowser subMsg, MoleculeBrowser moleculeBrowser ) ->
            MoleculeBrowser.update subMsg moleculeBrowser
                |> updateWith MoleculeBrowser MsgMoleculeBrowser


updateWith : (subModel -> Model) -> (subMsg -> Msg) -> ( subModel, Cmd subMsg ) -> ( Model, Cmd Msg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel, Cmd.map toMsg subCmd )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
