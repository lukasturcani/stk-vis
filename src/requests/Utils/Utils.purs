module Requests.Utils
    ( maybeFold
    , maybeToArray
    ) where

import Prelude
import Data.Maybe (Maybe (..))
import Data.List (List, (:))


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
