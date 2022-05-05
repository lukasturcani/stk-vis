module Page.MoleculeBrowser exposing
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



-- MODEL


type alias Model =
    { molecules : Picker Molecule
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { molecules =
            picker
                []
                (molecule
                    (atom H (position 0 0 0), [])
                    []
                )
                []
      }
    , Cmd.none
    )


type Picker a
    = Picker (List a) a (List a)


picker : List a -> a -> List a -> Picker a
picker =
    Picker


type Molecule
    = Molecule
        { atoms : NonEmptyList Atom
        , bonds : List Bond
        }


molecule : NonEmptyList Atom -> List Bond -> Molecule
molecule atoms bonds =
    Molecule { atoms = atoms, bonds = bonds }


type alias NonEmptyList a =
    ( a, List a )


type Atom
    = Atom AtomicElement Position


atom : AtomicElement -> Position -> Atom
atom =
    Atom


type AtomicElement
    = H


type Position
    = Position Float Float Float


position : Float -> Float -> Float -> Position
position =
    Position


type Bond
    = Bond BondType AtomId AtomId


type BondType
    = BondTypeInteger Int


type AtomId
    = AtomId Int



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "StkVis"
    , body = [ Element.layout [] (Element.text "MoleculeBrowser") ]
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
