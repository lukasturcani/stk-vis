module Snackbar
    ( Snackbar
    , errorSnackbar
    ) where

import Prelude
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Effect.Exception (Error)
import Effect.Exception as Error
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

errorSnackbar :: Deferred => Snackbar -> Error -> Promise Unit
errorSnackbar snackbar error = pure
    (unsafePerformEffect
        (_showErrorSnackbar snackbar error)
    )

_showErrorSnackbar :: Snackbar -> Error -> Effect Unit
_showErrorSnackbar snackbar error = do
    runEffectFn1 snackbar.setMessage (Error.message error)
    runEffectFn1 snackbar.setOpen true
