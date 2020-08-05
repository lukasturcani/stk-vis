module RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    ( nextPageIndex
    , toRequestSortType
    ) where

import Prelude
import RequestManager.SortType (SortType (..))
import RequestManager.PageKind (PageKind (..))
import Requests.SortType as Requests.SortType

nextPageIndex :: PageKind -> Int -> Int
nextPageIndex OnlyIncomplete pageIndex = pageIndex
nextPageIndex LastIncomplete pageIndex = pageIndex
nextPageIndex _ pageIndex = pageIndex + 1

toRequestSortType :: SortType -> Requests.SortType.SortType
toRequestSortType Ascending = Requests.SortType.Ascending
toRequestSortType Descending = Requests.SortType.Descending
