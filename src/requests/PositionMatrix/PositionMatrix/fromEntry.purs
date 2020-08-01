module Requests.PositionMatrix.Internal.FromEntry
    ( fromEntry
    ) where

import Requests.PositionMatrix.Internal.Data (PositionMatrix (..))
import Mongo as Mongo

import Requests.PositionMatrix.Internal.PositionMatrixEntry
    ( toPositionMatrixEntry
    )

fromEntry :: MoleculeKeyName -> Mongo.Entry -> Maybe PositionMatrix
fromEntry moleculeKey entry = do
    matrixEntry <- toPositionMatrixEntry moleculeKey entry
    pure $ PositionMatrix
        { _key: matrixEntry.key
        , _matrix: matrixEntry.matrix
        }
