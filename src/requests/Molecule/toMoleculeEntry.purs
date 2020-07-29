module Requests.Molecule.Internal.ToMoleculeEntry
    ( toMoleculeEntry
    ) where

import Prelude
import Data.List (List (Nil))
import Data.Maybe (Maybe (Nothing, Just))
import Data.Array (fromFoldable, (!!))
import Data.Map (Map, empty, insert)
import Data.Foldable (foldM)
import Requests.Utils (maybeFold)
import Mongo as Mongo

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
    order   <- entry !! 1
    pure { atom1Id, atom2Id, order }

type Helpers =
    { empty   :: Map String String

    , insert
        :: String -> String -> Map String String -> Map String String

    , nothing :: Maybe (MoleculeEntry Unit Unit)
    , just    :: Unit -> Maybe Unit
    }

foreign import toUncheckedMoleculeEntry
    :: Helpers
    -> Mongo.Entry
    -> Maybe (MoleculeEntry (Array Int) (Array Int))

toMoleculeEntry
    :: Mongo.Entry -> Maybe (MoleculeEntry AtomEntry BondEntry)

toMoleculeEntry entry = do

    let
        helpers =
            { empty: empty
            , insert: insert
            , nothing: Nothing
            , just: Just
            }

    unchecked <- toUncheckedMoleculeEntry helpers entry
    atomEntries <- foldM (maybeFold toAtomEntry) Nil unchecked.atoms
    bondEntries <- foldM (maybeFold toBondEntry) Nil unchecked.bonds
    pure (
        { keys: unchecked.keys
        , atoms: fromFoldable atomEntries
        , bonds: fromFoldable bondEntries
        }
    )
