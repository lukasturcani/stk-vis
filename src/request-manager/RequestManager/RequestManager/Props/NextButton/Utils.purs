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
    , Snackbars
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

errorSnackbar
    :: Deferred
    => Snackbars
    -> PageKind
    -> Error.Error
    -> Promise Unit

errorSnackbar snackbars pageKind error = pure
    (unsafePerformEffect
        (_showErrorSnackbar snackbars pageKind error)
    )

_showErrorSnackbar
    :: Snackbars -> PageKind -> Error.Error -> Effect Unit

_showErrorSnackbar snackbars LastComplete error
    | Error.message error == "No valid molecules were found." = do
        runEffectFn1 snackbars.success.setMessage "Refreshed!"
        runEffectFn1 snackbars.success.setOpen true

    | otherwise = do
        runEffectFn1 snackbars.error.setMessage (Error.message error)
        runEffectFn1 snackbars.error.setOpen true


_showErrorSnackbar snackbars OnlyComplete error
    | Error.message error == "No valid molecules were found." = do
        runEffectFn1 snackbars.success.setMessage "Refreshed!"
        runEffectFn1 snackbars.success.setOpen true

    | otherwise = do
        runEffectFn1 snackbars.error.setMessage (Error.message error)
        runEffectFn1 snackbars.error.setOpen true

_showErrorSnackbar snackbars _ error = do
    runEffectFn1 snackbars.error.setMessage (Error.message error)
    runEffectFn1 snackbars.error.setOpen true
