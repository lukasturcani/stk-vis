module Requests.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    , PositionEntry
    , molecule
    ) where

import ValidatedMolecule.Position as Position
import ValidatedMolecule as Validated
import Data.Array as Array
import Data.List as List
import Data.Maybe.Utils as Maybe
import Mongo as Mongo

newtype AtomEntry     = AtomEntry (Array Int)
newtype BondEntry     = BondEntry (Array Int)
newtype PositionEntry = PositionEntry (Array Number)

type MoleculeEntry r =
    { key            :: MoleculeKeyValue
    , atoms          :: Array AtomEntry
    , bonds          :: Array BondEntry
    , positionMatrix :: Array PositionEntry
    , constructed    :: Boolean
    | r
    }


molecule :: MoleculeEntry -> Maybe Validated.Molecule
molecule entry = do

    atoms <-
        foldM
            (Maybe.addWith atom)
            List.Nil
            (zip entry.atoms entry.positionMatrix)

    bonds <-
        foldM
            (Maybe.addWith bond)
            List.Nil
            entry.bonds

    Validated.molecule
        (Array.fromFoldable atoms)
        (Array.fromFoldable bonds)

type Helpers =
    { nothing :: Maybe Unit
    , just    :: Unit -> Maybe Unit
    }

foreign import _fromEntry
    :: Helpers
    -> Mongo.Entry
    -> Maybe MoleculeEntry


fromEntry :: Mongo.Entry -> Maybe.MoleculeEntry
fromEntry = _fromEntry { nothing: Nothing, just: Just }


position :: PositionEntry -> Maybe Position.Position
position (AtomEntry coordinates) = do
    x <- coordinates !! 0
    y <- coordinates !! 1
    z <- coordinates !! 2
    pure (Position.position x y z)


atom :: Tuple AtomEntry PositionEntry -> Maybe Validated.Atom
atom (Tuple entry position) = do
    atomicNumber <- entry !! 0
    chemicalSymbol <- Validated.chemicalSymbol atomicNumber
    pure
        (Validated.atom
            chemicalSymbol
            (Position.position position)
        )


bond :: BondEntry -> Maybe Validated.Bond
bond entry = do
    atom1Id <- entry !! 0
    atom2Id <- entry !! 1
    order   <- entry !! 2
    pure
        (Validated.bond
            (if order == 9 then 1 else order)
            atom1Id
            atom2Id
        )
