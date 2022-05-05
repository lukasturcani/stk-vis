module Page.MoleculeBrowser.BackButton
    ( Props
    , Snackbars
    , Snackbar
    , disabled
    , previousPageIndex
    , errorSnackbar
    ) where

import Prelude
import PageKind (PageKind)
import PageKind as PageKind
import Effect (Effect)
import Effect.Promise (class Deferred, Promise)
import DispatchAction (DispatchAction)
import Effect.Exception (Error, message) as Error
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

type Props a =
    { disabled :: Boolean
    , onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise Unit
    }

disabled :: PageKind -> Boolean
disabled PageKind.First          = true
disabled PageKind.OnlyComplete   = true
disabled PageKind.OnlyIncomplete = true
disabled _                       = false

previousPageIndex :: Int -> Int
previousPageIndex pageIndex
    | pageIndex <= 0 = 0
    | otherwise      = pageIndex - 1

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
