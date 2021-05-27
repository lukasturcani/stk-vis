module Requests.Molecule.Internal.ToMoleculeEntry
    ( toMoleculeEntry
    ) where

import Prelude
import Data.List (List (Nil))
import Data.Tuple (Tuple (Tuple))
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils (addWith)
import Data.Array (fromFoldable, (!!), zip)
import Data.Foldable (foldM)
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import ValidatedMolecule.Position as Position

import Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    )

type DatabaseAtom = Array Int
type DatabaseBond = Array Int
type DatabasePosition= Array Number

type DatabaseMolecule=
    { key            :: MoleculeKeyValue
    , atoms          :: Array DatabaseAtom
    , bonds          :: Array DatabaseBond
    , positionMatrix :: Array DatabasePosition
    , constructed    :: Boolean
    }

toAtomEntry
    :: Tuple DatabaseAtom DatabasePosition
    -> Maybe AtomEntry

toAtomEntry entry = do
    let (Tuple atom position) = entry
    atomicNumber <- atom !! 0
    charge <- atom !! 1
    x <- position !! 0
    y <- position !! 1
    z <- position !! 2
    pure
        { atomicNumber
        , charge
        , position: Position.position x y z
        }

toBondEntry :: DatabaseBond -> Maybe BondEntry
toBondEntry entry = do
    atom1Id <- entry !! 0
    atom2Id <- entry !! 1
    order   <- entry !! 2
    pure { atom1Id, atom2Id, order }

type Helpers =
    { nothing :: Maybe Unit
    , just    :: Unit -> Maybe Unit
    }

foreign import toUncheckedMoleculeEntry
    :: Helpers
    -> MoleculeKeyName
    -> Mongo.Entry
    -> Maybe DatabaseMolecule

toMoleculeEntry
    :: MoleculeKeyName
    -> Mongo.Entry
    -> Maybe MoleculeEntry

toMoleculeEntry moleculeKey entry = do

    let
        helpers =
            { nothing: Nothing
            , just: Just
            }

    unchecked <- toUncheckedMoleculeEntry helpers moleculeKey entry

    atomEntries
        <- foldM
            (addWith toAtomEntry)
            Nil
            (zip unchecked.atoms unchecked.positionMatrix)

    bondEntries <- foldM (addWith toBondEntry) Nil unchecked.bonds
    pure (
        { key: unchecked.key
        , atoms: fromFoldable atomEntries
        , bonds: fromFoldable bondEntries
        , constructed: unchecked.constructed
        }
    )
