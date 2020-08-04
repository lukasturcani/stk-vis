module Requests.SortType
    ( SortType (..)
    , isAscending
    ) where

data SortType = Ascending | Descending

isAscending :: SortType -> Boolean
isAscending Ascending = true
isAscending _         = false
