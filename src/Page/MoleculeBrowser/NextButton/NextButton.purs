module Page.MoleculeBrowser.NextButton
    ( Props
    , Snackbars
    , Snackbar
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect.Uncurried (EffectFn1)
import DispatchAction (DispatchAction)

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
