module Molecules.Molecules.Internal.Reducer
    ( reducer
    ) where

import Molecules.Action (Action)
import Molecules.Molecules.Internal.Molecules (Molecules)

import Molecules.Molecules.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    )

reducer :: Molecules -> Action -> Molecules
reducer
    molecules
    ({ payload: (InitializeMolecules payload) })
    = initializeMolecules molecules payload
