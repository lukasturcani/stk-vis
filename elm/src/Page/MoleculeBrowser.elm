port module Page.MoleculeBrowser exposing
    ( Model
    , Msg
    , init
    , subscriptions
    , update
    , view
    )

import Browser
import Element
import Element.Input as Input
import Html
import Internal.Elements as Elements
import Internal.Molecule as Molecule
import Internal.MoleculeTable as MoleculeTable
import Internal.NonEmptyList as NonEmptyList
import Internal.Picker as Picker
import Json.Encode as E
import Widget.Material as Material



-- MODEL


type MoleculeKey
    = MoleculeKey String


moleculeKeyToString : MoleculeKey -> String
moleculeKeyToString (MoleculeKey value) =
    value


type alias Model =
    { molecules : Picker.Picker Molecule.Molecule
    , moleculeKey : MoleculeKey
    , constructedMoleculeCollection : String
    , positionMatrixCollection : String
    , buildingBlockPositionMatrixCollection : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    let
        molecule =
            Molecule.fromAtom
                (Molecule.atom
                    Elements.H
                    (Molecule.position 0 0 0)
                )

        molecules =
            Picker.picker
                (List.repeat 3 molecule)
                molecule
                (List.repeat 4 molecule)
    in
    ( { molecules =
            molecules
      , moleculeKey =
            MoleculeKey "SMILES"
      , constructedMoleculeCollection = "constructedMolecules"
      , positionMatrixCollection = "positionMatrices"
      , buildingBlockPositionMatrixCollection = "buildingBlockPositionMatrices"
      }
    , Picker.picked molecules
        |> Molecule.toJson
        |> sendSelectedMolecule
    )



-- PORTS


port sendSelectedMolecule : E.Value -> Cmd msg


port sendDatabaseRequest : E.Value -> Cmd msg


sendUnsortedAllRequest model =
    sendDatabaseRequest
        (E.list
            identity
            [ matchMoleculeKeyExists model.moleculeKey
            , getConstructedMolecule
                model.constructedMoleculeCollection
                (moleculeKeyToString model.moleculeKey)
            , getPositionMatrix
                model.positionMatrixCollection
                model.moleculeKey
                "positionMatrix1"
            , getPositionMatrix
                model.buildingBlockPositionMatrixCollection
                model.moleculeKey
                "positionMatrix2"
            , hasPositionMatrix
            ]
        )



-- VIEW


style =
    { moleculeTable =
        { elementTable =
            Material.sortTable Material.darkPalette
                |> .elementTable
        }
    }


view : Model -> Browser.Document Msg
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
                    { elementTable = [] }
                    model.molecules
                , Input.button
                    []
                    { onPress = Just SendUnsortedAllRequest
                    , label = Element.text "Send Unsorted All Request"
                    }
                ]
            )
        ]
    }



-- UPDATE


type Msg
    = SendUnsortedAllRequest


exists =
    E.object [ ( "$exists", E.bool True ) ]


moleculeKeyExists moleculeKey =
    E.object [ ( moleculeKeyToString moleculeKey, exists ) ]


matchMoleculeKeyExists moleculeKey =
    E.object [ ( "$match", moleculeKeyExists moleculeKey ) ]


lookup from localField foreignField as_ =
    E.object
        [ ( "$lookup"
          , E.object
                [ ( "from", E.string from )
                , ( "localField", E.string localField )
                , ( "foreignField", E.string foreignField )
                , ( "as", E.string as_ )
                ]
          )
        ]


match m =
    E.object [ ( "$match", m ) ]


expr e =
    E.object [ ( "$expr", e ) ]


or o =
    E.object [ ( "$or", E.list identity o ) ]


gt g =
    E.object [ ( "$gt", E.list identity g ) ]


size s =
    E.object [ ( "$size", E.string s ) ]


getConstructedMolecule collection moleculeKey =
    lookup
        collection
        moleculeKey
        moleculeKey
        "constructedMolecule"


getPositionMatrix collection moleculeKey destination =
    lookup
        collection
        (moleculeKeyToString moleculeKey)
        (moleculeKeyToString moleculeKey)
        destination


hasPositionMatrix =
    match
        (expr
            (or
                [ gt [ size "$positionMatrix1", E.int 0 ]
                , gt [ size "$positionMatrix2", E.int 0 ]
                ]
            )
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SendUnsortedAllRequest ->
            ( model
            , sendUnsortedAllRequest model
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
