module Internal.Molecule exposing
    ( Molecule
    , decoder
    , toJson
    )

import Dict exposing (Dict)
import Internal.NonEmptyList as NonEmptyList exposing (NonEmptyList)
import Json.Decode as D exposing (Decoder, Value)
import Json.Encode as E


type Molecule
    = Molecule
        { atoms : NonEmptyList Atom
        , positions : NonEmptyList Position
        , bonds : List Bond
        , properties : Dict String String
        }


toJson : Molecule -> Value
toJson (Molecule { atoms, positions, bonds }) =
    let
        jsonAtoms =
            atoms
                |> NonEmptyList.toList
                |> E.list atomToJson

        jsonPositions =
            positions
                |> NonEmptyList.toList
                |> E.list positionToJson

        jsonBonds =
            bonds
                |> E.list bondToJson
    in
    E.object
        [ ( "atoms", jsonAtoms )
        , ( "positions", jsonPositions )
        , ( "bonds", jsonBonds )
        ]


atomToJson : Atom -> Value
atomToJson (Atom atomicNumber) =
    E.object
        [ ( "atomicNumber", E.int atomicNumber )
        ]


positionToJson : Position -> Value
positionToJson (Position x y z) =
    E.list E.float [ x, y, z ]


bondToJson : Bond -> Value
bondToJson (Bond (BondTypeInteger order) (AtomId id1) (AtomId id2)) =
    E.list E.int [ order, id1, id2 ]


type alias AtomicNumber =
    Int


type Atom
    = Atom AtomicNumber


type Position
    = Position Float Float Float


type Bond
    = Bond BondType AtomId AtomId


type BondType
    = BondTypeInteger Int


type AtomId
    = AtomId Int


decoder : Decoder Molecule
decoder =
    D.map4
        (\atoms positions bonds properties ->
            Molecule
                { atoms = atoms, positions = positions, bonds = bonds, properties = properties }
        )
        (D.field "atoms" (D.oneOrMore NonEmptyList.new atomDecoder))
        (D.field "positions" (D.oneOrMore NonEmptyList.new positionDecoder))
        (D.field "bonds" (D.list bondDecoder))
        (D.field "columns" (D.dict D.string))


atomDecoder : Decoder Atom
atomDecoder =
    D.map Atom (D.field "atomicNumber" D.int)


positionDecoder : Decoder Position
positionDecoder =
    D.map3 Position
        (D.index 0 D.float)
        (D.index 1 D.float)
        (D.index 2 D.float)


bondDecoder : Decoder Bond
bondDecoder =
    D.map3 Bond
        (D.field "order" bondTypeDecoder)
        (D.field "atom1" atomIdDecoder)
        (D.field "atom2" atomIdDecoder)


bondTypeDecoder : Decoder BondType
bondTypeDecoder =
    D.map BondTypeInteger D.int


atomIdDecoder : Decoder AtomId
atomIdDecoder =
    D.int
        |> D.map AtomId
