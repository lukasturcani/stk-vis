module Requests.Utils
    ( maybeFold
    , maybeToArray
    , dataQuery
    ) where

import Prelude
import Data.Maybe (Maybe (..))
import Data.List (List, (:))
import Mongo as Mongo
import Requests.Molecule (Molecule)


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

foreign import dataQuery ::  -> Array String -> Mongo.Query


