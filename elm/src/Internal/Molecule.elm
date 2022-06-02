module Internal.Molecule exposing
    ( Molecule
    , molecule
    , fromAtom
    , toJson
    , atom
    , position
    )

import List
import Internal.Elements as Elements
import Internal.NonEmptyList as NonEmptyList
import Json.Encode as E


type Molecule
    = Molecule
        { atoms : NonEmptyList.NonEmptyList Atom
        , bonds : List Bond
        }


toJson : Molecule -> E.Value
toJson (Molecule {atoms, bonds}) =
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
            [ ("atoms", jsonAtoms)
            , ("bonds", jsonBonds)
            ]

atomToJson : Atom -> E.Value
atomToJson (Atom element (Position x y z)) =
    E.object
        [ ("element", E.int (Elements.atomicNumber element))
        , ("position", E.list E.float [x, y, z])
        ]


bondToJson : Bond -> E.Value
bondToJson (Bond (BondTypeInteger order) (AtomId id1) (AtomId id2)) =
    E.list E.int [order, id1, id2]


hasValidAtomIds : Int -> Bond -> Bool
hasValidAtomIds numAtoms (Bond _ (AtomId id1) (AtomId id2)) =
    id1 < numAtoms && id2 < numAtoms


fromAtom : Atom -> Molecule
fromAtom atom_ =
    Molecule
        { atoms = NonEmptyList.singleton atom_
        , bonds = []
        }

molecule :
   NonEmptyList.NonEmptyList Atom
   -> List Bond
   -> Maybe Molecule
molecule atoms bonds =
    if List.all (hasValidAtomIds (NonEmptyList.length atoms)) bonds
    then
        Just (Molecule { atoms = atoms, bonds = bonds })
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
