module Molecules.InitializeMolecules
    ( InitializeMolecules
    , Molecule
    , initializeMolecules
    , molecules
    ) where

import SelectingCollection (SelectingCollection)

data Molecule = Molecule

newtype InitializeMolecules
    = InitializeMolecules (SelectingCollection Molecule)

initializeMolecules
    :: SelectingCollection Molecule -> InitializeMolecules
initializeMolecules = InitializeMolecules

molecules :: InitializeMolecules -> SelectingCollection Molecule
molecules (InitializeMolecules molecules') = molecules'

