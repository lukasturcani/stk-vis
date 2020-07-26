module Molecules.InitializeMolecules
    ( InitializeMolecules
    , initializeMolecules
    )

import Molecules.Molecules (Molecules)

data InitializeMolecules = InitializeMolecules
    { _molecules :: Molecules
    }

initializeMolecules :: Molecules -> InitializeMolecules
initializeMolecules molecules = InitializeMolecules
    { _molecules: molecules
    }
