module Requests.PositionMatrix.Internal.Data
    ( PositionMatrix (..)
    , Matrix
    , key
    , matrix
    ) where

import Requests.MoleculeKey (MoleculeKeyValue)

type Matrix = Array (Array Number)

data PositionMatrix = PositionMatrix
    { _key    :: MoleculeKeyValue
    , _matrix :: Matrix
    }

key :: PositionMatrix -> MoleculeKeyValue
key (PositionMatrix { _key }) = _key

matrix :: PositionMatrix -> Matrix
matrix (PositionMatrix { _matrix }) = _matrix
