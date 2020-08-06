module RequestManager.SortType
    ( SortType (..)
    , ascending
    , descending
    , toRequest
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
