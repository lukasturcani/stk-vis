module Data.Maybe.Utils
    ( addWith
    , toArray
    ) where

import Prelude
import Data.List (List, (:))
import Data.Maybe (Maybe (..))

addWith
    :: forall a b
    . (a -> Maybe b)
    -> List b
    -> a
    -> Maybe (List b)

addWith f xs x = do
    fx <- f x
    pure (fx : xs)

toArray :: forall a. Maybe a -> Array a
toArray Nothing = []
toArray (Just x) = [x]
