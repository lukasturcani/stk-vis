module Requests.PositionMatrix.Utils
    ( toMap
    ) where

import Prelude
import Data.Tuple (Tuple (Tuple))
import Data.Map (Map, fromFoldable)
import Requests.MoleculeKey (MoleculeKeyValue)
import Requests.PositionMatrix (PositionMatrix, key)

toMap :: Array PositionMatrix -> Map MoleculeKeyValue PositionMatrix
toMap matrices
    = fromFoldable
    $ map (\matrix -> Tuple (key matrix) matrix) matrices
