module RequestManager.RequestManager.Internal.Props.Internal.SortButton
    ( SortButtonProps
    , sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    , valueCollections
    )


data SortButtonProps = SortButtonProps
    { collections :: Array String
    }

sortButtonProps :: RequestManager -> SortButtonProps
sortButtonProps requestManager = SortButtonProps
    { collections: valueCollections requestManager
    }
