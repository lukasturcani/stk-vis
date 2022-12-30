port module Page.MoleculeBrowser exposing
    ( Model
    , Msg
    , subscriptions
    , update
    , view
    )

import Browser exposing (Document)
import Element
import Internal.Molecule as Molecule exposing (Molecule)
import Internal.MoleculeTable as MoleculeTable
import Internal.Picker as Picker exposing (Picker)
import Json.Decode as D exposing (Value)



-- MODEL


type alias Model =
    Maybe
        { molecules : Picker Molecule
        , columns : List String
        }



-- PORTS


port sendSelectedMolecule : Value -> Cmd msg


port receiveMolecules : (Value -> msg) -> Sub msg


decodeMolecules : Value -> Msg
decodeMolecules value =
    case D.decodeValue (D.list D.value) value of
        Err error ->
            GotMolecules [] [ D.errorToString error ]

        Ok molecules ->
            molecules
                |> List.map (D.decodeValue Molecule.decoder)
                |> List.foldr
                    (\molecule ( oks, errs ) ->
                        case molecule of
                            Ok m ->
                                ( m :: oks, errs )

                            Err e ->
                                ( oks, D.errorToString e :: errs )
                    )
                    ( [], [] )
                |> (\( mols, errs ) -> GotMolecules mols errs)



-- VIEW


view : Model -> Document Msg
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
    = GotMolecules (List Molecule) (List String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( GotMolecules (first :: rest) errors, _ ) ->
            ( Just
                { molecules = Picker.new [] first rest
                , columns = []
                }
            , first
                |> Molecule.toJson
                |> sendSelectedMolecule
            )

        ( _, Nothing ) ->
            ( model, Cmd.none )

        ( _, Just innerModel ) ->
            ( model
            , innerModel.molecules
                |> Picker.picked
                |> Molecule.toJson
                |> sendSelectedMolecule
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ receiveMolecules decodeMolecules
        ]
