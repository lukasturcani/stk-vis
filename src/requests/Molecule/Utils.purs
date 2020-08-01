module Requests.Molecule.Utils
    ( toMap
    ) where

import Prelude
import Data.Tuple (Tuple (Tuple))
import Data.Map (Map, fromFoldable)
import Requests.Molecule (MoleculeKeyValue, Molecule, key)

toMap :: Array Molecule -> Map MoleculeKeyValue Molecule
toMap molecules
    = fromFoldable
    $ map (\molecule -> Tuple (key molecule) molecule) molecules
