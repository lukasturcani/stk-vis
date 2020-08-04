module RequestManager.RequestManager.Internal.Props.Internal.NextButton
    ( NextButtonProps
    , nextButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    (RequestManager)

data NextButtonProps = NextButtonProps

nextButtonProps :: RequestManager -> NextButtonProps
nextButtonProps requestManager = NextButtonProps
