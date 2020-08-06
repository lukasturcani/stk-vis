module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))

nextPageIndex :: PageKind -> Int -> Int
nextPageIndex LastIncomplete pageIndex = pageIndex
nextPageIndex OnlyIncomplete _         = 0
nextPageIndex _              pageIndex = pageIndex + 1

lastPage :: PageKind -> Boolean
lastPage LastComplete   = true
lastPage LastIncomplete = true
lastPage OnlyComplete   = true
lastPage OnlyIncomplete = true
lastPage _              = false
