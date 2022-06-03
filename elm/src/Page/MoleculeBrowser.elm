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
import Html
import Internal.Elements as Elements
import Internal.Molecule as Molecule
import Internal.MoleculeTable as MoleculeTable
import Internal.NonEmptyList as NonEmptyList
import Internal.Picker as Picker
import Json.Encode as E
import Widget.Material as Material



-- MODEL


type alias Model =
    { molecules : Picker.Picker Molecule.Molecule
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
      }
    , Picker.picked molecules
        |> Molecule.toJson
        |> sendSelectedMolecule
    )



-- PORTS


port sendSelectedMolecule : E.Value -> Cmd msg



-- VIEW


style =
    { moleculeTable =
        { row = Material.row
        }
    }


view : Model -> Browser.Document Msg
view model =
    { title = "StkVis"
    , body =
        [ Element.layout
            []
            (Element.column
                []
                [ Element.text "MoleculeBrowser"
                , MoleculeTable.view
                    style.moleculeTable
                    model.molecules
                ]
            )
        ]
    }



-- UPDATE


type Msg
    = Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
