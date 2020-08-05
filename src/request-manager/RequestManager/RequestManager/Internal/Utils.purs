module RequestManager.ReuqestManager.Internal.RequestManager.Internal.Utils
    ( nextPageIndex
    ) where

nextPageIndex :: PageKind -> Int -> Int
nextPageIndex OnlyIncomplete pageIndex = pageIndex
nextPageIndex LastIncomplete pageIndex = pageIndex
nextPageIndex _ pageIndex = pageIndex + 1
