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



{-

   The idea is that you provide a query -- which
   gets run -- and returns molecules in the form of

   {
     "atoms": [{"atomicNumber": 1, "position": [1,2,3]}]
     "bonds": [{"from": 1, "to": 2, "order": 2}
     "columns": {
       "a": 1
       "b": 2,
     }
   }

-}
-- MODEL


type alias Model =
    Maybe
        { molecules : Picker.Picker Molecule.Molecule
        , columns : List String
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Nothing, Cmd.none )



-- PORTS


port sendSelectedMolecule : E.Value -> Cmd msg
port receiveMolecules : (E.Value -> msg) -> Sub msg



-- VIEW


view : Model -> Browser.Document Msg
view model =
    case model of
        Nothing ->
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
                        [ Element.text "NOTHING"
                        ]
                    )
                ]
            }

        Just innerModel ->
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
                            innerModel.molecules
                        ]
                    )
                ]
            }



-- UPDATE


type Msg
    = Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        Nothing ->
            ( model, Cmd.none )

        Just innerModel ->
            ( model
            , innerModel.molecules
                |> Picker.picked
                |> Molecule.toJson
                |> sendSelectedMolecule
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
      [ receiveMolecules (D.list Molecule.decoder)
      ]
