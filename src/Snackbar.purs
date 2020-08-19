module Snackbar
    ( Snackbar
    ) where

import Prelude
import Effect.Uncurried (EffectFn1)

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }
