module Molecules.InitializeMolecules
    ( InitializeMolecules
    , initializeMolecules
    , molecules
    ) where

import Molecules.Molecules (Molecules)

data InitializeMolecules = InitializeMolecules
    { _molecules :: Molecules
    }

initializeMolecules :: Molecules -> InitializeMolecules
initializeMolecules molecules' = InitializeMolecules
    { _molecules: molecules'
    }

molecules :: InitializeMolecules -> Molecules
molecules (InitializeMolecules { _molecules }) = _molecules
