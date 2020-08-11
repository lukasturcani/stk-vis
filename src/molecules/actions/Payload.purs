module Molecules.Payload
    ( Payload (..)
    , initializeMolecules
    , selectMolecule
    , updateMoleculePage
    ) where

import Molecules.InitializeMolecules (InitializeMolecules)
import Molecules.SelectMolecule (SelectMolecule)
import RequestManager.UpdateMoleculePage

data Payload
    = InitializeMolecules InitializeMolecules
    | SelectMolecule SelectMolecule
    | UpdateMoleculePage UpdateMoleculePage

initializeMolecules :: InitializeMolecules -> Payload
initializeMolecules = InitializeMolecules

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

updateMoleculePage :: UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage
