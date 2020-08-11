module Molecules.Action
    ( Action
    , initializeMolecules
    , selectMolecule
    , updateMoleculePage
    ) where

import Molecules.InitializeMolecules (InitializeMolecules)
import Molecules.SelectMolecule (SelectMolecule)
import RequestManager.UpdateMoleculePage (UpdateMoleculePage)
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

updateMoleculePage :: UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }
