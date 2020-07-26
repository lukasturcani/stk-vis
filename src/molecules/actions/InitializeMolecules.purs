module Molecules.InitializeMolecules
    ( InitializeMolecules
    , Molecule
    , initializeMolecules
    , molecules
    ) where

data Molecule = Molecule

data InitializeMolecules = InitializeMolecules
    { _molecules :: Array Molecule
    }

initializeMolecules :: Array Molecule -> InitializeMolecules
initializeMolecules molecules' = InitializeMolecules
    { _molecules: molecules'
    }

molecules :: InitializeMolecules -> Array Molecule
molecules (InitializeMolecules { _molecules }) = _molecules
