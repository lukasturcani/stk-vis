module Molecules.Payload
    ( Payload (..)
    , initializeMolecules
    , selectMolecule
    ) where

import Molecules.InitializeMolecules (InitializeMolecules)
import Molecules.SelectMolecule (SelectMolecule)

data Payload
    = InitializeMolecules InitializeMolecules
    | SelectMolecule SelectMolecule

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule
