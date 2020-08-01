module Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    ) where

import Requests.MoleculeKey (MoleculeKeyValue)
import Data.Map (Map)

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
    { key   :: MoleculeKeyValue
    , atoms :: Array a
    , bonds :: Array b
    }
