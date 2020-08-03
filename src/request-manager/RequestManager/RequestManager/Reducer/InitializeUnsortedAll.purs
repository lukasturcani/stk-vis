module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import RequestManager.InitializeUnsortedAll as Payload

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager (UnsortedAll)
    ) as RequestManager

import RequestManager.RequestManager.Internal.RequestManager.UnsortedAll
    as UnsortedAll

initializeUnsortedAll
    :: RequestManager.RequestManager
    -> Payload.InitializeUnsortedAll
    -> RequestManager.RequestManager

initializeUnsortedAll _ payload
    = RequestManager.UnsortedAll unsortedAll
  where
    unsortedAll = UnsortedAll.UnsortedAll
        { _url: (Payload.url payload)
        }
