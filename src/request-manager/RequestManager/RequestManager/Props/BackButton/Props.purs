module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    ) where

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)

data BackButtonProps a = BackButtonProps
    { disabled :: Boolean

    , onClick
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    }
