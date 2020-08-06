module RequestManager.RequestManager.Internal.Props.Internal.NextButton.Internal.Props
    ( NextButtonProps (..)
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)

data NextButtonProps a = NextButtonProps
    { lastPage :: Boolean

    , onClick
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    }
