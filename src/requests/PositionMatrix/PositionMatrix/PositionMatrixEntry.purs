module Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( PositionMatrixEntry
    ) where

import Requests.MoleculeKey (MoleculeKeyValue)

type PositionMatrixEntry =
    { key    :: MoleculeKeyValue
    , matrix :: Array (Array Number)
    }
