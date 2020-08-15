module SortType
    ( SortType (..)
    , toRequest
    , ascending
    , descending
    ) where

import Requests.SortType as Request

data SortType = Ascending | Descending

ascending :: SortType
ascending = Ascending

descending :: SortType
descending = Descending

toRequest :: SortType -> Request.SortType
toRequest Ascending = Request.Ascending
toRequest Descending = Request.Descending
