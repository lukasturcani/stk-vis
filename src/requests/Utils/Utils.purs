module Requests.Utils
    ( maybeFold
    , maybeToArray
    , dataQuery
    ) where

import Prelude
import Data.Maybe (Maybe (..))
import Data.Map (Map)
import Data.List (List, (:))
import Mongo as Mongo
import Requests.MoleculeKey (MoleculeKeyName, MoleculeKeyValue)
import Requests.Molecule (Molecule)
import Requests.PositionMatrix (PositionMatrix)

maybeFold
    :: forall a b
    . (a -> Maybe b)
    -> List b
    -> a
    -> Maybe (List b)

maybeFold f xs x = do
    fx <- f x
    pure (fx : xs)

maybeToArray :: forall a. Maybe a -> Array a
maybeToArray Nothing = []
maybeToArray (Just x) = [x]

foreign import dataQuery
    :: MoleculeKeyName -> Array MoleculeKeyValue -> Mongo.Query


addPositionMatrices
    :: Map MoleculeKeyValue Molecule
    -> Map MoleculeKeyValue PositionMatrix
    -> Array Molecule

addPositionMatrices molecules matrices = do
    (Tuple key molecule) <- Array.fromFoldable (items molecules)
    matrix <- maybeToArray
    maybeToArray $ addPositionMatrix molecule matrix
