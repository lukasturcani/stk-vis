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
import Internal.MoleculeKeyName as MoleculeKeyName
import Internal.MoleculeTable as MoleculeTable
import Internal.NonEmptyList as NonEmptyList
import Internal.Picker as Picker
import Internal.Queries as Queries
import Json.Decode as D
import Json.Encode as E
import Widget.Material as Material



-- MODEL


type alias Model =
    { molecules : Picker.Picker Molecule.Molecule
    , moleculeKey : MoleculeKeyName.MoleculeKeyName
    , constructedMoleculeCollection : String
    , positionMatrixCollection : String
    , buildingBlockPositionMatrixCollection : String
    , visibleColumns : List String
    , hiddenColumns : List String
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
            MoleculeKeyName.fromString "SMILES"
      , constructedMoleculeCollection =
            "constructedMolecules"
      , positionMatrixCollection =
            "positionMatrices"
      , buildingBlockPositionMatrixCollection =
            "buildingBlockPositionMatrices"
      , visibleColumns =
            [ "NumAtoms"
            , "NumBonds"
            ]
      , hiddenColumns =
            [ "Energy"
            ]
      }
    , Picker.picked molecules
        |> Molecule.toJson
        |> sendSelectedMolecule
    )



-- PORTS


port sendSelectedMolecule : E.Value -> Cmd msg


port sendMoleculeQuery : E.Value -> Cmd msg


port moleculeQueryResponse : (D.Value -> msg) -> Sub msg


port sendPropertyQuery : E.Value -> Cmd msg


port propertyQueryResponse : (D.Value -> msg) -> Sub msg



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
                |> sendMoleculeQuery
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
