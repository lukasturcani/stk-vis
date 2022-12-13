module Internal.Molecule exposing
    ( Molecule
    , atom
    , fromAtom
    , molecule
    , position
    , toJson
    )

import Dict
import Internal.Elements as Elements
import Internal.NonEmptyList as NonEmptyList
import Json.Decode as D
import Json.Encode as E
import List


type Molecule
    = Molecule
        { atoms : NonEmptyList.NonEmptyList Atom
        , bonds : List Bond
        , properties : Dict.Dict String E.Value
        }


toJson : Molecule -> E.Value
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


atomToJson : Atom -> E.Value
atomToJson (Atom element (Position x y z)) =
    E.object
        [ ( "atomicNumber", E.int (Elements.atomicNumber element) )
        , ( "position", E.list E.float [ x, y, z ] )
        ]


bondToJson : Bond -> E.Value
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


molecule :
    Dict.Dict String E.Value
    -> NonEmptyList.NonEmptyList Atom
    -> List Bond
    -> Maybe Molecule
molecule properties atoms bonds =
    if List.all (hasValidAtomIds (NonEmptyList.length atoms)) bonds then
        Just (Molecule { atoms = atoms, bonds = bonds, properties = properties })

    else
        Nothing


type Atom
    = Atom Elements.Element Position


atom : Elements.Element -> Position -> Atom
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



decoder =
  D.map3 molecule
    (D.field "atoms" (D.list atomDecoder))
    (D.field "bonds" (D.list bondDecoder))
    (D.field "columns" (D.dict D.string))


atomDecoder : D.Decoder Atom
atomDecoder =
  D.map2 atom
    (D.field "atomicNumber" D.int)
    (D.field "position" positionDecoder)


positionDecoder : D.Decoder Position
positionDecoder =
  D.map3 position
    (D.index 0 D.float)
    (D.index 1 D.float)
    (D.index 2 D.float)



elementDecoder : Int -> D.Decoder Elements.Element
elementDecoder atomicNumber =
    case Elements.fromAtomicNumber atomicNumber of
        Just element ->
            D.succeed element

        Nothing ->
            String.concat
                [ String.fromInt atomicNumber
                , " is not a valid atomic number."
                ]
                |> D.fail


bondDecoder : D.Decoder Bond
bondDecoder =
    D.map3 Bond
        (D.index 0 bondTypeDecoder)
        (D.index 1 atomIdDecoder)
        (D.index 2 atomIdDecoder)


bondTypeDecoder : D.Decoder BondType
bondTypeDecoder =
    D.index 0 D.int
        |> D.map BondTypeInteger


atomIdDecoder : D.Decoder AtomId
atomIdDecoder =
    D.int
        |> D.map AtomId
