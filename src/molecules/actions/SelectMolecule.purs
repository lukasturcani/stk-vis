module Molecules.SelectMolecule
    ( SelectMolecule
    , selectMolecule
    , selected
    ) where

import Data.Tuple (Tuple (Tuple))
import Molecules.Molecule (Molecule)

data SelectMolecule = SelectMolecule
    { _selected :: Tuple Int Molecule
    }

selectMolecule :: Int -> Molecule -> SelectMolecule
selectMolecule id molecule = SelectMolecule
    { _selected: Tuple id molecule
    }

selected :: SelectMolecule -> Tuple Int Molecule
selected (SelectMolecule { _selected }) = _selected
