module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))

nextPageIndex :: Int -> Int
nextPageIndex pageIndex
    | pageIndex <= 0 = 0
    | otherwise      = pageIndex - 1

lastPage :: PageKind -> Boolean
lastPage LastComplete   = true
lastPage LastIncomplete = true
lastPage OnlyComplete   = true
lastPage OnlyIncomplete = true
lastPage _              = false
