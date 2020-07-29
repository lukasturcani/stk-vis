module Requests.Molecule.Internal.ToMoleculeEntry
    ( toMoleculeEntry
    , MoleculeEntry
    , AtomEntry
    , BondEntry
    ) where

import Prelude
import Data.List (List (Nil))
import Data.Maybe (Maybe (Nothing, Just))
import Data.Array (fromFoldable, (!!))
import Data.Map (Map, empty, insert)
import Data.Foldable (foldM)
import Requests.Utils (maybeFold)
import Mongo as Mongo

type AtomEntry =
    { atomicNumber :: Int
    , charge       :: Int
    }

type BondEntry =
    { order   :: Int
    , atom1Id :: Int
    , atom2Id :: Int
    }

type MoleculeEntry a b =
    { keys  :: Map String String
    , atoms :: Array a
    , bonds :: Array b
    }

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
    , insert  :: String -> String -> Map String String
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
            { empty
            , insert
            , nothing: Nothing
            , just: Just
            }

    unchecked <- toUncheckedMoleculeEntry helpers entry
    atomEntries <- foldM (maybeFold toAtomEntry) Nil unchecked.atoms
    bondEntries <- foldM (maybeFold toBondEntry) Nil unchecked.bonds
    pure
        { keys: unchecked.keys
        , atoms: fromFoldable atomEntries
        , bonds: fromFoldable bondEntries
        }
