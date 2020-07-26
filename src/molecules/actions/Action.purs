module Molecules.Action
    ( Action
    , initializeMolecules
    ) where

import Molecules.Molecules (Molecules)

import Molecules.Payload
    ( Payload (..)
    , initializeMolecules
    ) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

initializeMolecules :: InitializeMolecules -> Action
initializeMolecules initializeMolecules' =
    { type: "INITIALIZE_MOLECULES"
    , payload: Payload.initializeMolecules initializeMolecules'
    }
