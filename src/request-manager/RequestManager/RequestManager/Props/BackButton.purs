module RequestManager.RequestManager.Internal.Props.Internal.BackButton
    ( BackButtonProps
    , backButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    (RequestManager)

data BackButtonProps = BackButtonProps
    { disabled :: Boolean
    }

backButtonProps :: RequestManager -> BackButtonProps
backButtonProps requestManager = BackButtonProps
    { disabled: false
    }
