module Main exposing (main)

import Browser exposing (Document, UrlRequest)
import Browser.Navigation as Nav
import Html
import Page.MoleculeBrowser as MoleculeBrowser
import Page.MongoConfig as MongoConfig
import Url exposing (Url)



-- MAIN


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- MODEL


type Model
    = MongoConfig MongoConfig.Model
    | MoleculeBrowser MoleculeBrowser.Model


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    ( MongoConfig (MongoConfig.init key)
    , Cmd.none
    )



-- VIEW


view : Model -> Document Msg
view model =
    case model of
        MongoConfig mongoConfig ->
            let
                { title, body } =
                    MongoConfig.view mongoConfig
            in
            { title = title
            , body = List.map (Html.map MsgMongoConfig) body
            }

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
    | MsgMongoConfig MongoConfig.Msg
    | UrlChanged Url
    | LinkClicked UrlRequest


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( MsgMoleculeBrowser subMsg, MoleculeBrowser moleculeBrowser ) ->
            MoleculeBrowser.update subMsg moleculeBrowser
                |> updateWith MoleculeBrowser MsgMoleculeBrowser

        ( MsgMongoConfig subMsg, MongoConfig mongoConfig ) ->
            MongoConfig.update subMsg mongoConfig
                |> updateWith MongoConfig MsgMongoConfig

        ( _, _ ) ->
            ( model, Cmd.none )


updateWith : (subModel -> Model) -> (subMsg -> Msg) -> ( subModel, Cmd subMsg ) -> ( Model, Cmd Msg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel, Cmd.map toMsg subCmd )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        MoleculeBrowser subModel ->
            Sub.map MsgMoleculeBrowser (MoleculeBrowser.subscriptions subModel)

        MongoConfig subModel ->
            Sub.map MsgMongoConfig (MongoConfig.subscriptions subModel)
