module Molecules.Molecules.Internal.Reducer
    ( reducer
    ) where

import Molecules.Action (Action)
import Molecules.Payload (Payload (..))
import Molecules.Molecules.Internal.Molecules (Molecules)

import Molecules.Molecules.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    )

import Molecules.Molecules.Internal.Reducer.Internal.SelectMolecule
    ( selectMolecule
    )

reducer :: Molecules -> Action -> Molecules
reducer
    molecules
    ({ payload: (InitializeMolecules payload) })
    = initializeMolecules molecules payload

reducer
    molecules
    ({ payload: (SelectMolecule payload) })
    = selectMolecule molecules payload
