module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    , Snackbar
    , Snackbars
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)
import Effect.Uncurried (EffectFn1)

type DispatchAction a = EffectFn1 a Unit

type Snackbar =
    { setOpen    :: EffectFn1 Boolean Unit
    , setMessage :: EffectFn1 String Unit
    }

type Snackbars =
    { success :: Snackbar
    , error   :: Snackbar
    }

data BackButtonProps a = BackButtonProps
    { disabled :: Boolean

    , onClick
        :: Deferred
        => DispatchAction a
        -> Snackbars
        -> Promise Unit
    }
