module Internal.Molecule exposing
    ( Molecule
    , atom
    , decoder
    , fromAtom
    , new
    , position
    , toJson
    )

import Dict exposing (Dict)
import Internal.Element as Element exposing (Element)
import Internal.NonEmptyList as NonEmptyList exposing (NonEmptyList)
import Json.Decode as D exposing (Decoder, Value)
import Json.Encode as E
import List


type Molecule
    = Molecule
        { atoms : NonEmptyList Atom
        , bonds : List Bond
        , properties : Dict String String
        }


toJson : Molecule -> Value
toJson (Molecule { atoms, bonds }) =
    let
        jsonAtoms =
            atoms
                |> NonEmptyList.toList
                |> E.list atomToJson

        jsonBonds =
            bonds
                |> E.list bondToJson
    in
    E.object
        [ ( "atoms", jsonAtoms )
        , ( "bonds", jsonBonds )
        ]


atomToJson : Atom -> Value
atomToJson (Atom element (Position x y z)) =
    E.object
        [ ( "atomicNumber", E.int (Element.atomicNumber element) )
        , ( "position", E.list E.float [ x, y, z ] )
        ]


bondToJson : Bond -> Value
bondToJson (Bond (BondTypeInteger order) (AtomId id1) (AtomId id2)) =
    E.list E.int [ order, id1, id2 ]


hasValidAtomIds : Int -> Bond -> Bool
hasValidAtomIds numAtoms (Bond _ (AtomId id1) (AtomId id2)) =
    id1 < numAtoms && id2 < numAtoms


fromAtom : Atom -> Molecule
fromAtom atom_ =
    Molecule
        { atoms = NonEmptyList.singleton atom_
        , bonds = []
        , properties = Dict.empty
        }


new :
    Dict String String
    -> NonEmptyList Atom
    -> List Bond
    -> Maybe Molecule
new properties atoms bonds =
    if List.all (hasValidAtomIds (NonEmptyList.length atoms)) bonds then
        Just (Molecule { atoms = atoms, bonds = bonds, properties = properties })

    else
        Nothing


type Atom
    = Atom Element Position


atom : Element -> Position -> Atom
atom =
    Atom


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


decoder : Decoder Molecule
decoder =
    D.map3 new
        (D.field "columns" (D.dict D.string))
        (D.field "atoms" (D.oneOrMore NonEmptyList.new atomDecoder))
        (D.field "bonds" (D.list bondDecoder))
        |> D.andThen decoderHelp


decoderHelp : Maybe Molecule -> Decoder Molecule
decoderHelp molecule =
    case molecule of
        Nothing ->
            D.fail "Not a valid molecule."

        Just m ->
            D.succeed m


atomDecoder : Decoder Atom
atomDecoder =
    D.map2 atom
        (D.field "atomicNumber" elementDecoder)
        (D.field "position" positionDecoder)


positionDecoder : Decoder Position
positionDecoder =
    D.map3 position
        (D.index 0 D.float)
        (D.index 1 D.float)
        (D.index 2 D.float)


elementDecoder : Decoder Element
elementDecoder =
    D.int
        |> D.andThen elementDecoderHelp


elementDecoderHelp : Int -> Decoder Element
elementDecoderHelp atomicNumber =
    case Element.fromAtomicNumber atomicNumber of
        Just element ->
            D.succeed element

        Nothing ->
            String.concat
                [ String.fromInt atomicNumber
                , " is not a valid atomic number."
                ]
                |> D.fail


bondDecoder : Decoder Bond
bondDecoder =
    D.map3 Bond
        (D.index 0 bondTypeDecoder)
        (D.index 1 atomIdDecoder)
        (D.index 2 atomIdDecoder)


bondTypeDecoder : Decoder BondType
bondTypeDecoder =
    D.index 0 D.int
        |> D.map BondTypeInteger


atomIdDecoder : Decoder AtomId
atomIdDecoder =
    D.int
        |> D.map AtomId
