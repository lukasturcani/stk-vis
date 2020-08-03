module Molecules.Action
    ( Action
    , initializeMolecules
    , selectMolecule
    ) where

import Molecules.InitializeMolecules (InitializeMolecules)
import Molecules.SelectMolecule (SelectMolecule)
import Molecules.Payload as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

initializeMolecules :: InitializeMolecules -> Action
initializeMolecules payload =
    { type: "INITIALIZE_MOLECULES"
    , payload: Payload.initializeMolecules payload
    }

selectMolecule :: SelectMolecule -> Action
selectMolecule payload =
    { type: "SELECT_MOLECULE"
    , payload: Payload.selectMolecule payload
    }
