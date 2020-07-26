module Molecules.Molecules.Internal.Molecules
    ( Molecules (..)
    ) where

import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

data Molecules = Molecules
    { _columns   :: Array String
    , _molecules :: SelectingCollection Molecule
    }
