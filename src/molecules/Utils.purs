module Molecules.Utils
    ( molecule
    ) where

import Prelude
import Molecules.Molecule as Molecule
import Data.Map (fromFoldable)
import Data.Tuple (Tuple (Tuple))

molecule :: Molecule.Molecule
molecule = Molecule.molecule $
    fromFoldable
        [ Tuple "one" "1"
        , Tuple "two" "2"
        , Tuple "three" "3"
        , Tuple "four" "4"
        ]
