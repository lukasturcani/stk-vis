module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Utils
    ( lastPage
    , nextPageIndex
    , showRefreshedSnackbar
    , errorSnackbar
    ) where

import Prelude
import RequestManager.PageKind (PageKind (..))
import Effect (Effect)
import Effect.Uncurried (runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Exception (Error, message) as Error
import Effect.Promise (class Deferred, Promise)

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

errorSnackbar :: Deferred  => Snackbar  -> Error.Error -> Promise Unit
errorSnackbar snackbar error = pure
    (unsafePerformEffect
        (_showErrorSnackbar snackbar error)
    )

_showErrorSnackbar :: Snackbar -> Error.Error -> Effect Unit
_showErrorSnackbar snackbar error = do
    runEffectFn1 snackbar.setMessage (Error.message error)
    runEffectFn1 snackbar.setOpen true
