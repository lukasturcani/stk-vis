module RequestManager.RequestManager.Internal.RequestManager.Internal.Utils
    ( nextPageIndex
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))

nextPageIndex :: PageKind -> Int -> Int
nextPageIndex OnlyIncomplete pageIndex = pageIndex
nextPageIndex LastIncomplete pageIndex = pageIndex
nextPageIndex _ pageIndex = pageIndex + 1
