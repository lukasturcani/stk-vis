module Requests.PositionMatrix.Internal.FromEntry
    ( fromEntry
    ) where

import Prelude
import Requests.MoleculeKey (MoleculeKeyName)
import Data.Maybe (Maybe)
import Requests.PositionMatrix.Internal.Data (PositionMatrix (..))
import Mongo as Mongo

import Requests.PositionMatrix.Internal.ToPositionMatrixEntry
    ( toPositionMatrixEntry
    )

fromEntry :: MoleculeKeyName -> Mongo.Entry -> Maybe PositionMatrix
fromEntry moleculeKey entry = do
    matrixEntry <- toPositionMatrixEntry moleculeKey entry
    pure $ PositionMatrix
        { _key: matrixEntry.key
        , _matrix: matrixEntry.matrix
        }
