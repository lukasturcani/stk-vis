port module Page.MongoConfig exposing
    ( Model
    , Msg
    , subscriptions
    , update
    , view
    )

import Browser exposing (Document)
import Element exposing (Element)
import Element.Input as Input
import Internal.QueryType as QueryType exposing (QueryType)
import Json.Encode as E exposing (Value)



-- MODEL


type alias Model =
    { uri : String
    , database : String
    , collection : String
    , query : String
    , queryType : QueryType
    }



-- PORTS


port mongoFind : Value -> Cmd msg


port mongoAggregate : Value -> Cmd msg



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
                [ text GotUri "uri" model.uri
                , text GotDatabase "database" model.database
                , text GotCollection "collection" model.collection
                , text GotQuery "query" model.query
                , Input.radioRow
                    []
                    { onChange = GotQueryType
                    , options =
                        [ Input.option QueryType.Find (Element.text "find")
                        , Input.option QueryType.Aggregate (Element.text "aggregate")
                        ]
                    , selected = Just model.queryType
                    , label = Input.labelLeft [] (Element.text "query type")
                    }
                , Input.button
                    []
                    { onPress = Just ClickedSearch
                    , label = Element.text "search"
                    }
                ]
            )
        ]
    }


text : (String -> Msg) -> String -> String -> Element Msg
text msg label content =
    Input.text
        []
        { onChange = msg
        , text = content
        , placeholder = Nothing
        , label = Input.labelLeft [] (Element.text label)
        }



-- UPDATE


type Msg
    = GotUri String
    | GotDatabase String
    | GotCollection String
    | GotQuery String
    | GotQueryType QueryType
    | ClickedSearch
    | ClickedAggregate


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotUri uri ->
            ( { model | uri = uri }, Cmd.none )

        GotDatabase database ->
            ( { model | database = database }, Cmd.none )

        GotCollection collection ->
            ( { model | collection = collection }, Cmd.none )

        GotQuery query ->
            ( { model | query = query }, Cmd.none )

        GotQueryType queryType ->
            ( { model | queryType = queryType }, Cmd.none )

        ClickedSearch ->
            ( model
            , mongoFind
                (E.object
                    [ ( "uri", E.string model.uri )
                    , ( "database", E.string model.database )
                    , ( "collection", E.string model.collection )
                    , ( "query", E.string model.query )
                    ]
                )
            )

        ClickedAggregate ->
            ( model
            , mongoAggregate
                (E.object
                    [ ( "uri", E.string model.uri )
                    , ( "database", E.string model.database )
                    , ( "collection", E.string model.collection )
                    , ( "query", E.string model.query )
                    ]
                )
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
