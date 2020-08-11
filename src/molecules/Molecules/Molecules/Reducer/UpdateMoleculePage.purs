module Molecules.Molecules.Internal.Reducer.Internal.UpdateMoleculePage
    ( updateMoleculePage
    ) where

import Prelude
import Molecules.Molecule (molecule')
import Molecules.Molecules.Internal.Molecules (Molecules (Molecules))
import RequestManager.UpdateMoleculePage as Payload

updateMoleculePage
    :: Molecules -> Payload.UpdateMoleculePage -> Molecules

updateMoleculePage
    molecules
    payload
    = Molecules
        { _columns: Payload.columns payload
        , _molecules: map (molecule' moleculeKey) requestMolecules
        }
  where
    moleculeKey = Payload.moleculeKey payload
    requestMolecules = Payload.molecules payload
