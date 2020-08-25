module Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( PositionMatrixEntry
    ) where

import ValidatedMolecule.Position (Position)
import Requests.MoleculeKey (MoleculeKeyValue)

type PositionMatrixEntry =
    { key    :: MoleculeKeyValue
    , matrix :: Array Position
    }
