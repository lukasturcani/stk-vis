port module Page.MongoConfig exposing
    ( Model
    , Msg(..)
    , init
    , mongoAggregate
    , mongoFind
    , subscriptions
    , update
    , view
    )

import Browser exposing (Document)
import Element exposing (Element)
import Element.Input as Input
import Internal.Queries as Queries
import Internal.QueryType as QueryType exposing (QueryType)
import Json.Encode as E exposing (Value)



-- MODEL


type alias Model =
    { uri : String
    , database : String
    , collection : String
    , query : String
    , queryType : QueryType
    , postprocess : String
    }


init : Model
init =
    { uri = "mongodb://localhost:27017"
    , database = "stkVis"
    , collection = "molecules"
    , query =
        Queries.normalized
            { moleculeKey = "InChIKey"
            , positionMatrixCollection = "position_matrices"
            , valueCollections = [ "numAtoms", "numBonds" ]
            }
            |> E.encode 4
    , queryType = QueryType.Aggregate
    , postprocess =
        """let columns = {};
  let numAtoms = entry.numAtoms[0]?.v?.toString();
  if (numAtoms !== undefined) {
    columns["Num Atoms"] = numAtoms;
  }
  let numBonds = entry.numBonds[0]?.v?.toString();
  if (numBonds !== undefined) {
    columns["Num Bonds"] = numBonds;
  }
  return {
  atoms: entry.a.map(([atomicNumber]) => { return {atomicNumber}; }),
  positions: entry.positions[0].m,
  bonds: entry.b.map(([atom1, atom2, order]) => { return {order, atom1, atom2}; }),
  columns,
};"""
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
                , Input.multiline
                    []
                    { onChange = GotQuery
                    , text = model.query
                    , placeholder = Nothing
                    , label = Input.labelLeft [] (Element.text "query")
                    , spellcheck = False
                    }
                , Input.multiline
                    []
                    { onChange = GotPostprocess
                    , text = model.postprocess
                    , placeholder = Nothing
                    , label = Input.labelLeft [] (Element.text "def postprocess(entry)")
                    , spellcheck = False
                    }
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
                    { onPress =
                        case model.queryType of
                            QueryType.Find ->
                                Just ClickedFind

                            QueryType.Aggregate ->
                                Just ClickedAggregate
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
    | GotPostprocess String
    | ClickedFind
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

        GotPostprocess postprocess ->
            ( { model | postprocess = postprocess }, Cmd.none )

        ClickedFind ->
            ( model
            , mongoFind
                (E.object
                    [ ( "uri", E.string model.uri )
                    , ( "database", E.string model.database )
                    , ( "collection", E.string model.collection )
                    , ( "query", E.string model.query )
                    , ( "postprocess", E.string model.postprocess )
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
                    , ( "postprocess", E.string model.postprocess )
                    ]
                )
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
