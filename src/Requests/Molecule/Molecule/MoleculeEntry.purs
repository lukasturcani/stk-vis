module Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    ) where

import Requests.MoleculeKey (MoleculeKeyValue)
import ValidatedMolecule.Position (Position)

type AtomEntry =
    { atomicNumber :: Int
    , charge       :: Int
    , position     :: Position
    }

type BondEntry =
    { order   :: Int
    , atom1Id :: Int
    , atom2Id :: Int
    }

type MoleculeEntry =
    { key         :: MoleculeKeyValue
    , atoms       :: Array AtomEntry
    , bonds       :: Array BondEntry
    , constructed :: Boolean
    }
