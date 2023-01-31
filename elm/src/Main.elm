port module Main exposing (main)

import Browser exposing (Document)
import Debug
import Html
import Json.Decode as D
import Json.Encode as E exposing (Value)
import Page.MoleculeBrowser as MoleculeBrowser
import Page.MongoConfig as MongoConfig
import Page.NoValidMolecules as NoValidMolecules
import Page.WaitingForMolecules as WaitingForMolecules



-- MAIN


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = debugUpdate
        , subscriptions = subscriptions
        }



-- MODEL


type Model
    = MongoConfig MongoConfig.Model
    | MoleculeBrowser MoleculeBrowser.Model
    | WaitingForMolecules WaitingForMolecules.Model
    | NoValidMolecules NoValidMolecules.Model


init : () -> ( Model, Cmd Msg )
init _ =
    ( MongoConfig MongoConfig.init
    , Cmd.none
    )



-- PORTS


port receiveMolecules : (Value -> msg) -> Sub msg


receiveMoleculesHelper : Value -> Msg
receiveMoleculesHelper molecules =
    case D.decodeValue (D.list D.value) molecules of
        Ok success ->
            case success of
                firstMolecule :: otherMolecules ->
                    GotMolecules firstMolecule otherMolecules

                [] ->
                    GotZeroReceivedMolecules

        Err _ ->
            ReceivedMoleculesNotAList



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

        NoValidMolecules noValidMolecules ->
            NoValidMolecules.view noValidMolecules

        WaitingForMolecules _ ->
            WaitingForMolecules.view



-- UPDATE


type Msg
    = MsgMoleculeBrowser MoleculeBrowser.Msg
    | MsgMongoConfig MongoConfig.Msg
    | GotMolecules Value (List Value)
    | ReceivedMoleculesNotAList
    | GotZeroReceivedMolecules


debugUpdate : Msg -> Model -> ( Model, Cmd Msg )
debugUpdate msg model =
    Debug.log "update result" (update (Debug.log "message" msg) (Debug.log "old model" model))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( MsgMongoConfig MongoConfig.ClickedFind, MongoConfig mongoConfig ) ->
            ( WaitingForMolecules { columns = mongoConfig.columns }
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
            ( WaitingForMolecules { columns = mongoConfig.columns }
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

        ( GotMolecules first rest, MoleculeBrowser moleculeBrowser ) ->
            let
                ( newModel, cmd ) =
                    MoleculeBrowser.update (MoleculeBrowser.gotMolecules first rest) moleculeBrowser
            in
            ( MoleculeBrowser newModel, Cmd.map MsgMoleculeBrowser cmd )

        ( GotMolecules first rest, WaitingForMolecules waitingForMolecules ) ->
            ( MoleculeBrowser (MoleculeBrowser.init waitingForMolecules.columns first rest), Cmd.none )

        ( _, _ ) ->
            ( model, Cmd.none )


updateWith : (subModel -> Model) -> (subMsg -> Msg) -> ( subModel, Cmd subMsg ) -> ( Model, Cmd Msg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel, Cmd.map toMsg subCmd )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        subs =
            receiveMolecules receiveMoleculesHelper
    in
    case model of
        MoleculeBrowser _ ->
            subs

        MongoConfig subModel ->
            Sub.batch
                [ subs
                , Sub.map MsgMongoConfig (MongoConfig.subscriptions subModel)
                ]

        WaitingForMolecules _ ->
            subs

        NoValidMolecules _ ->
            subs
