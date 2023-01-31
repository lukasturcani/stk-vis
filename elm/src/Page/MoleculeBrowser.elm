module Page.MoleculeBrowser exposing
    ( Model
    , Msg
    , gotMolecules
    , init
    , update
    , view
    )

import Browser exposing (Document)
import Dict exposing (Dict)
import Element
import Internal.MoleculeTable as MoleculeTable
import Internal.TwoDMoleculeViewer as TwoDMoleculeViewer
import Json.Decode as D exposing (Error, Value)



-- MODEL


type alias Model =
    { molecules : List Value
    , moleculeColumns : List (Result Error (Dict String String))
    , selectedRowIndex : Int
    , selectedMolecule : Value
    , columns : List String
    }


init : List String -> Value -> List Value -> Model
init columns firstMolecule otherMolecules =
    let
        molecules =
            firstMolecule :: otherMolecules
    in
    { molecules = molecules
    , moleculeColumns = List.map (D.decodeValue columnsDecoder) molecules
    , selectedRowIndex = 0
    , selectedMolecule = firstMolecule
    , columns = columns
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
                [ Element.text "MoleculeBrowser"
                , MoleculeTable.view
                    { toMsg = { clickedRow = ClickedRow }
                    , columnNames = model.columns
                    , rows = List.map2 Tuple.pair model.molecules model.moleculeColumns
                    , selectedRowIndex = model.selectedRowIndex
                    }
                , TwoDMoleculeViewer.view model.selectedMolecule
                ]
            )
        ]
    }



-- UPDATE


type Msg
    = GotMolecules Value (List Value)
    | ClickedRow Int Value
    | ReceivedMoleculesNotAList
    | GotZeroReceivedMolecules


gotMolecules : Value -> List Value -> Msg
gotMolecules =
    GotMolecules


columnsDecoder : D.Decoder (Dict String String)
columnsDecoder =
    D.field "columns" (D.dict D.string)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotMolecules firstMolecule otherMolecules ->
            let
                molecules =
                    firstMolecule :: otherMolecules
            in
            ( { model
                | molecules = molecules
                , selectedRowIndex = 0
                , selectedMolecule = firstMolecule
                , moleculeColumns = List.map (D.decodeValue columnsDecoder) molecules
              }
            , Cmd.none
            )

        ClickedRow index molecule ->
            ( { model | selectedRowIndex = index, selectedMolecule = molecule }
            , Cmd.none
            )

        ReceivedMoleculesNotAList ->
            ( model, Cmd.none )

        GotZeroReceivedMolecules ->
            ( model, Cmd.none )
