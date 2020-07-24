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
    { disabled :: Boolean
    }

backButtonProps :: RequestManager -> BackButtonProps
backButtonProps requestManager = BackButtonProps
    { disabled: false
    }

data SortButtonProps = SortButtonProps
    { collections :: Array String
    }

sortButtonProps :: RequestManager -> SortButtonProps
sortButtonProps requestManager = SortButtonProps
    { collections: ["one", "two", "three"]
    }
