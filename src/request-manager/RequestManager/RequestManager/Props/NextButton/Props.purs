module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( NextButtonProps (..)
    , DispatchAction
    , Snackbar
    , Snackbars
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)
import Effect.Uncurried (EffectFn1)

type DispatchAction a = a -> Effect Unit

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

data NextButtonProps a = NextButtonProps
    { lastPage :: Boolean

    , onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise (Effect Unit)
    }
