module Molecules.InitializeMolecules
    ( InitializeMolecules
    , initializeMolecules
    , molecules
    , columns
    ) where

import SelectingCollection (SelectingCollection)
import Molecules.Molecule (Molecule)

data InitializeMolecules
    = InitializeMolecules (SelectingCollection Molecule) (Array String)

initializeMolecules
    :: SelectingCollection Molecule
    -> Array String
    -> InitializeMolecules

initializeMolecules = InitializeMolecules

molecules :: InitializeMolecules -> SelectingCollection Molecule
molecules (InitializeMolecules molecules' _) = molecules'

columns :: InitializeMolecules -> Array String
columns (InitializeMolecules _ columns') = columns'

