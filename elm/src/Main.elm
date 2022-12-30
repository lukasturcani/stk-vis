module Main exposing (main)

import Browser exposing (Document)
import Debug
import Html
import Json.Encode as E
import Page.MoleculeBrowser as MoleculeBrowser
import Page.MongoConfig as MongoConfig



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
    = MongoConfig MongoConfig.Model
    | MoleculeBrowser MoleculeBrowser.Model


init : () -> ( Model, Cmd Msg )
init _ =
    ( MongoConfig MongoConfig.init
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( Debug.log "message" msg, Debug.log "model" model ) of
        ( MsgMongoConfig MongoConfig.ClickedFind, MongoConfig mongoConfig ) ->
            ( MoleculeBrowser Nothing
            , MongoConfig.mongoFind
                (E.object
                    [ ( "uri", E.string mongoConfig.uri )
                    , ( "database", E.string mongoConfig.database )
                    , ( "collection", E.string mongoConfig.collection )
                    , ( "query", E.string mongoConfig.query )
                    , ( "postprocess", E.string mongoConfig.postprocess )
                    ]
                )
                |> Cmd.map MsgMongoConfig
            )

        ( MsgMongoConfig MongoConfig.ClickedAggregate, MongoConfig mongoConfig ) ->
            ( MoleculeBrowser Nothing
            , MongoConfig.mongoAggregate
                (E.object
                    [ ( "uri", E.string mongoConfig.uri )
                    , ( "database", E.string mongoConfig.database )
                    , ( "collection", E.string mongoConfig.collection )
                    , ( "query", E.string mongoConfig.query )
                    , ( "postprocess", E.string mongoConfig.postprocess )
                    ]
                )
                |> Cmd.map MsgMongoConfig
            )

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
