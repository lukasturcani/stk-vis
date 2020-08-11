module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    , showRefreshedSnackbar
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))
import Effect (Effect)
import Effect.Uncurried (runEffectFn1)

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

showRefreshedSnackbar :: SamePage-> Snackbar -> Effect Unit
showRefreshedSnackbar true snackbar = do
    runEffectFn1 snackbar.setMessage "Refreshed!"
    runEffectFn1 snackbar.setOpen true

showRefreshedSnackbar _ _ = pure unit
