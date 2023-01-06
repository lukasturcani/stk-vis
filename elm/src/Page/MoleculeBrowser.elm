port module Page.MoleculeBrowser exposing
    ( Model(..)
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


type Model
    = ModelData
        { molecules : Picker Molecule
        , decodingErrors : List String
        , columns : List String
        }
    | ModelWaiting
        { columns : List String
        }
    | ModelOnlyErrors
        { decodingErrors : List String
        , columns : List String
        }


columns : Model -> List String
columns model =
    case model of
        ModelData inner ->
            inner.columns

        ModelWaiting inner ->
            inner.columns

        ModelOnlyErrors inner ->
            inner.columns



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
        ModelWaiting _ ->
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

        ModelData innerModel ->
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
                        ([ Element.text "MoleculeBrowser"
                         , MoleculeTable.view
                            { clickedRow = ClickedRow }
                            innerModel.columns
                            innerModel.molecules
                         ]
                            ++ List.map Element.text innerModel.decodingErrors
                        )
                    )
                ]
            }

        ModelOnlyErrors innerModel ->
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
                        (List.map Element.text innerModel.decodingErrors)
                    )
                ]
            }



-- UPDATE


type Msg
    = GotMolecules (List Molecule) (List String)
    | ClickedRow Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( GotMolecules (first :: rest) errors, ModelData innerModel ) ->
            ( ModelData
                { molecules = Picker.new [] first rest
                , columns = innerModel.columns
                , decodingErrors = errors
                }
            , first
                |> Molecule.toJson
                |> sendSelectedMolecule
            )

        ( GotMolecules (first :: rest) errors, ModelWaiting innerModel ) ->
            ( ModelData
                { molecules = Picker.new [] first rest
                , columns = innerModel.columns
                , decodingErrors = errors
                }
            , first
                |> Molecule.toJson
                |> sendSelectedMolecule
            )

        ( GotMolecules (first :: rest) errors, ModelOnlyErrors innerModel ) ->
            ( ModelData
                { molecules = Picker.new [] first rest
                , columns = innerModel.columns
                , decodingErrors = errors
                }
            , first
                |> Molecule.toJson
                |> sendSelectedMolecule
            )

        ( GotMolecules [] errors, _ ) ->
            ( ModelOnlyErrors
                { columns = columns model
                , decodingErrors = errors
                }
            , Cmd.none
            )

        ( ClickedRow index, _ ) ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ receiveMolecules decodeMolecules
        ]
