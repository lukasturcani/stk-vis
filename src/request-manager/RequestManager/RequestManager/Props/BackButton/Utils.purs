module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))

disabled :: PageKind -> Boolean
disabled First          = true
disabled OnlyComplete   = true
disabled OnlyIncomplete = true
disabled _              = false

previousPageIndex :: Int -> Int
previousPageIndex pageIndex
    | pageIndex <= 0 = 0
    | otherwise      = pageIndex - 1
