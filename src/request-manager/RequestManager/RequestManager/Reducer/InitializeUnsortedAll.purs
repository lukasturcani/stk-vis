module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedAll)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

initializeUnsortedAll
    :: RequestManager -> InitializeUnsortedAll -> RequestManager
initializeUnsortedAll _ payload
    = RequestManager.UnsortedAll unsortedAll
  where
    unsortedAll = UnsortedAll.UnsortedAll
        { _url: (UnsortedAll.url payload)
        }
