module Requests.Molecule.Utils
    ( toMap
    ) where

import Data.Map (Map, fromFoldable)
import Requests.Molecule (MoleculeKeyValue, Molecule, key)

toMap :: Array Molecule -> Map MoleculeKeyValue Molecule
toMap moleculeKey molecules
    = fromFoldable
    $ map (\m -> Tuple (key molecule) molecule) molecules
