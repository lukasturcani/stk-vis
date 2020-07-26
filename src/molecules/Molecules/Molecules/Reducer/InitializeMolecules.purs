module Molecules.Molecules.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    ) where

import Molecules.Molecules.Internal.Molecules (Molecules (..))
import Molecules.InitializeMolecules (InitializeMolecules)

initializeMolecules :: Molecules -> InitializeMolecules -> Molecules
initializeMolecules _ payload = Molecules
