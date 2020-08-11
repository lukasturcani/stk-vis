module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    , pageRefreshed
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))
import Effect (Effect)

import RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( Snackbar
    )

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

type SamePage = Boolean

pageRefreshed :: SamePage-> Snackbar -> Effect Unit
pageRefreshed true snackbar = do
    snackbar.setOpen true
    snackbar.setMessage "Refreshed!"

pageRefreshed _ _ = pure unit
