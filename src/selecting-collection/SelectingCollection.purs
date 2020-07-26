module SelectingCollection
    ( SelectingCollection
    , selectingCollection
    , selected
    , all
    , select
    ) where

import Data.Map (Map, toAscUnfoldable, insert, union, fromFoldable)

data SelectingCollection a = SelectingCollection
    { _selected :: Tuple Int a
    , _all      :: Map Int a
    }

selectingCollection :: Array a -> a -> Array a -> SelectingCollection a
selectingCollection previous selected' next = SelectingCollection
    { _selected: selectedTuple
    , _all: union previous' next'
    }
  where
    numPrevious = length previous
    numNext = length next
    maxIndex = numPrevious + numNext
    selectedTuple = Tuple numPrevious selected'

    previous' = fromFoldable $
        zipWith Tuple [0 .. (numPrevious - 1)] previous

    next' = fromFoldable $
        zipWith Tuple [(numPrevious+1) .. maxIndex] next

selected :: SelectingCollection a -> Tuple Int a
selected (SelectingCollection { _selected }) = _selected

all :: SelectingCollection a -> Array a
all (SelectingCollection { _all }) = toAscUnfoldable _all

select :: SelectingCollection a -> Tuple Int a -> SelectingCollection a
select
    (SelectingCollection { _all: all' })
    item@(Tuple key value) =
        SelectingCollection
            { _selected: item
            , _all: insert key value all'
            }
