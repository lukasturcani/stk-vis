module Requests.PositionMatrix.Internal.Data
    ( PositionMatrix (..)
    , key
    , matrix
    ) where

import Requests.MoleculeKey (MoleculeKeyValue)
import ValidatedMolecule.Position (Position)

data PositionMatrix = PositionMatrix
    { _key    :: MoleculeKeyValue
    , _matrix :: Array Position
    }

key :: PositionMatrix -> MoleculeKeyValue
key (PositionMatrix { _key }) = _key

matrix :: PositionMatrix -> Array Position
matrix (PositionMatrix { _matrix }) = _matrix
