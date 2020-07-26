module Molecules.InitializeMolecules
    ( InitializeMolecules
    , Molecules (..)
    , Molecule
    , initializeMolecules
    , molecules
    ) where

data Molecule = Molecule

data Molecules = Molecules
    { previous :: Array Molecule
    , selected :: Molecule
    , next     :: Array Molecule
    }

newtype InitializeMolecules = InitializeMolecules Molecules

initializeMolecules :: Molecules -> InitializeMolecules
initializeMolecules = InitializeMolecules

molecules :: InitializeMolecules -> Molecules
molecules (InitializeMolecules molecules') = molecules'

