module RequestManager.SortType
    ( SortType (..)
    , ascending
    , descending
    ) where

data SortType = Ascending | Descending

ascending :: SortType
ascending = Ascending

descending :: SortType
descending = Descending
