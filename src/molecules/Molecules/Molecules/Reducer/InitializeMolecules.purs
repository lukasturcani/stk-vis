module Molecules.Molecules.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    ) where

import Molecules.Molecules.Internal.Molecules (Molecules (..))
import Molecules.InitializeMolecules
    (InitializeMolecules
    , molecules
    , columns
    )

initializeMolecules :: Molecules -> InitializeMolecules -> Molecules
initializeMolecules _ payload = Molecules
    { _columns: columns payload
    , _molecules: molecules payload
    }
