module Molecules.Payload
    ( Payload (..)
    , initializeMolecules
    ) where

import Molecules.InitializeMolecules (InitializeMolecules)

data Payload
    = InitializeMolecules InitializeMolecules

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules
