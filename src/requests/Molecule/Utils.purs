module Requests.Molecule.Utils
    ( toMap
    ) where

import Data.Map (Map, fromFoldable)
import Requests.Molecue (Molecule, keys)

type MoleculeKeyName = String
type MoleculeKey = String


toMap :: MoleculeKeyName -> Array Molecule -> Map MoleculeKey Molecule
toMap moleculeKey molecules = fromFoldable
