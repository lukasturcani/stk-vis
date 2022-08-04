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
import Internal.MoleculeKey as MoleculeKey
import Internal.MoleculeTable as MoleculeTable
import Internal.NonEmptyList as NonEmptyList
import Internal.Picker as Picker
import Internal.Queries as Queries
import Json.Encode as E
import Widget.Material as Material



-- MODEL


type alias Model =
    { molecules : Picker.Picker Molecule.Molecule
    , moleculeKey : MoleculeKey.MoleculeKey
    , constructedMoleculeCollection : String
    , positionMatrixCollection : String
    , buildingBlockPositionMatrixCollection : String
    , visibleColumns : List String
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
            MoleculeKey.fromString "SMILES"
      , constructedMoleculeCollection = "constructedMolecules"
      , positionMatrixCollection = "positionMatrices"
      , buildingBlockPositionMatrixCollection = "buildingBlockPositionMatrices"
      , visibleColumns =
            [ "NumAtoms"
            , "NumBonds"
            ]
      }
    , Picker.picked molecules
        |> Molecule.toJson
        |> sendSelectedMolecule
    )



-- PORTS


port sendSelectedMolecule : E.Value -> Cmd msg


port sendDatabaseRequest : E.Value -> Cmd msg



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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SendUnsortedAllRequest ->
            ( model
            , model
                |> Queries.unsortedAll
                |> sendDatabaseRequest
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
