module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import Prelude
import Effect.Promise (class Deferred, Promise)
import Effect (Effect)
import RequestManager.RequestResult (RequestResult)

data BackButtonProps a = BackButtonProps
    { disabled :: Boolean
    , request  :: Deferred => Promise RequestResult
    , onClick
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    }
