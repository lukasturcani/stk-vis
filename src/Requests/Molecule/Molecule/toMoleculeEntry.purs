module Requests.Molecule.Internal.ToMoleculeEntry
    ( toMoleculeEntry
    ) where

import Prelude
import Data.List (List (Nil))
import Data.Maybe (Maybe (Nothing, Just))
import Data.Maybe.Utils (addWith)
import Data.Array (fromFoldable, (!!))
import Data.Foldable (foldM)
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName)

import Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    )


toAtomEntry :: Array Int -> Maybe AtomEntry
toAtomEntry entry = do
    atomicNumber <- entry !! 0
    charge <- entry !! 1
    pure { atomicNumber, charge }

toBondEntry :: Array Int -> Maybe BondEntry
toBondEntry entry = do
    atom1Id <- entry !! 0
    atom2Id <- entry !! 1
    order   <- entry !! 2
    pure { atom1Id, atom2Id, order }

type Helpers =
    { nothing :: Maybe (MoleculeEntry Unit Unit)
    , just    :: Unit -> Maybe Unit
    }

foreign import toUncheckedMoleculeEntry
    :: Helpers
    -> MoleculeKeyName
    -> Mongo.Entry
    -> Maybe (MoleculeEntry (Array Int) (Array Int))

toMoleculeEntry
    :: MoleculeKeyName
    -> Mongo.Entry
    -> Maybe (MoleculeEntry AtomEntry BondEntry)

toMoleculeEntry moleculeKey entry = do

    let
        helpers =
            { nothing: Nothing
            , just: Just
            }

    unchecked <- toUncheckedMoleculeEntry helpers moleculeKey entry
    atomEntries <- foldM (addWith toAtomEntry) Nil unchecked.atoms
    bondEntries <- foldM (addWith toBondEntry) Nil unchecked.bonds
    pure (
        { key: unchecked.key
        , atoms: fromFoldable atomEntries
        , bonds: fromFoldable bondEntries
        , constructed: unchecked.constructed
        }
    )
