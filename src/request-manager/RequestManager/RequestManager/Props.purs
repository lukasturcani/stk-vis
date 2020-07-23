module RequestManager.RequestManager.Internal.Props
    ( NextButtonProps
    , nextButtonProps
    , BackButtonProps
    , backButtonProps
    , SortButtonProps
    , sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    (RequestManager)

data NextButtonProps = NextButtonProps

nextButtonProps :: RequestManager -> NextButtonProps
nextButtonProps requestManager = NextButtonProps


data BackButtonProps = BackButtonProps

backButtonProps :: RequestManager -> BackButtonProps
backButtonProps requestManager = BackButtonProps

data SortButtonProps = SortButtonProps

sortButtonProps :: RequestManager -> SortButtonProps
sortButtonProps requestManager = SortButtonProps
