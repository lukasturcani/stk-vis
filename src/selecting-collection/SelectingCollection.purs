module SelectingCollection
    ( SelectingCollection
    , selectingCollection
    , selected
    , all
    , select
    ) where

import Prelude
import Data.Map (Map, toUnfoldable, insert, union, fromFoldable)
import Data.Tuple (Tuple (Tuple), snd)
import Data.Array (zipWith, length, (..))

data SelectingCollection a = SelectingCollection
    { _selected :: Tuple Int a
    , _all      :: Map Int a
    }

selectingCollection
    :: forall a
    . Array a
    -> a
    -> Array a
    -> SelectingCollection a

selectingCollection previous selected' next = SelectingCollection
    { _selected: selectedTuple
    , _all: union previous' next'
    }
  where
    numPrevious = length previous
    numNext = length next
    maxIndex = numPrevious + numNext
    selectedTuple = Tuple numPrevious selected'

    previous' :: Map Int a
    previous' = fromFoldable $
        zipWith Tuple (0 .. (numPrevious - 1)) previous

    next' :: Map Int a
    next' = fromFoldable $
        zipWith Tuple ((numPrevious+1) .. maxIndex) next

selected :: forall a. SelectingCollection a -> Tuple Int a
selected (SelectingCollection { _selected }) = _selected

all :: forall a. SelectingCollection a -> Array a
all (SelectingCollection { _all }) = map snd (toUnfoldable _all)

select
    :: forall a
    . SelectingCollection a
    -> Tuple Int a
    -> SelectingCollection a

select
    (SelectingCollection { _all: all' })
    item@(Tuple key value) =
        SelectingCollection
            { _selected: item
            , _all: insert key value all'
            }
