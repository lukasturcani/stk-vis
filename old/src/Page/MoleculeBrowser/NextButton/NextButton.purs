module Page.MoleculeBrowser.NextButton
    ( Props
    , Snackbars
    , Snackbar
    , showRefreshedSnackbar
    , errorSnackbar
    , nextPageIndex
    ) where

import Prelude
import Effect (Effect)
import Effect.Promise (class Deferred, Promise)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Exception (Error, message) as Error
import DispatchAction (DispatchAction)
import PageKind (PageKind)
import PageKind as PageKind

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

type Props a =
    { lastPage :: Boolean
    , onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise Unit
    }

-------------------

type SamePage = Boolean

showRefreshedSnackbar :: SamePage-> Snackbar -> Effect Unit
showRefreshedSnackbar true snackbar = do
    runEffectFn1 snackbar.setMessage "Refreshed!"
    runEffectFn1 snackbar.setOpen true

showRefreshedSnackbar _ _ = pure unit


-------------------


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

_showErrorSnackbar snackbars PageKind.LastComplete error
    | Error.message error == "No valid molecules were found." = do
        runEffectFn1 snackbars.success.setMessage "Refreshed!"
        runEffectFn1 snackbars.success.setOpen true

    | otherwise = do
        runEffectFn1 snackbars.error.setMessage (Error.message error)
        runEffectFn1 snackbars.error.setOpen true


_showErrorSnackbar snackbars PageKind.OnlyComplete error
    | Error.message error == "No valid molecules were found." = do
        runEffectFn1 snackbars.success.setMessage "Refreshed!"
        runEffectFn1 snackbars.success.setOpen true

    | otherwise = do
        runEffectFn1 snackbars.error.setMessage (Error.message error)
        runEffectFn1 snackbars.error.setOpen true

_showErrorSnackbar snackbars _ error = do
    runEffectFn1 snackbars.error.setMessage (Error.message error)
    runEffectFn1 snackbars.error.setOpen true


-------------------


nextPageIndex :: PageKind -> Int -> Int
nextPageIndex PageKind.LastIncomplete pageIndex = pageIndex
nextPageIndex PageKind.OnlyIncomplete _         = 0
nextPageIndex _                       pageIndex = pageIndex + 1
