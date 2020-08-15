module SortType
    ( SortType (..)
    , toRequest
    ) where

import Requests.SortType as Request

data SortType = Ascending | Descending

toRequest :: SortType -> Request.SortType
toRequest Ascending = Request.Ascending
toRequest Descending = Request.Descending
