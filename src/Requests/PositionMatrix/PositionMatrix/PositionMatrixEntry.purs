module Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( PositionMatrixEntry
    , UnvalidatedPositionMatrixEntry
    ) where

import ValidatedMolecule.Position (Position)
import Requests.MoleculeKey (MoleculeKeyValue)

data UnvalidatedPositionMatrixEntry

type PositionMatrixEntry =
    { key    :: MoleculeKeyValue
    , matrix :: Array Position
    }
