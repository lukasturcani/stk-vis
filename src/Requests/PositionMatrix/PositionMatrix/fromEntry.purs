module Requests.PositionMatrix.Internal.FromEntry
    ( fromEntry
    ) where

import Prelude
import Requests.MoleculeKey (MoleculeKeyName)
import Data.Maybe (Maybe)
import Foreign (Foreign)
import Requests.PositionMatrix.Internal.Data (PositionMatrix (..))

import Requests.PositionMatrix.Internal.ToPositionMatrixEntry
    ( toPositionMatrixEntry
    )

fromEntry :: MoleculeKeyName -> Foreign -> Maybe PositionMatrix
fromEntry moleculeKey entry = do
    matrixEntry <- toPositionMatrixEntry moleculeKey entry
    pure $ PositionMatrix
        { _key: matrixEntry.key
        , _matrix: matrixEntry.matrix
        }
