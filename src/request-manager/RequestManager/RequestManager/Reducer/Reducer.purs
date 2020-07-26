module RequestManager.RequestManager.Internal.Reducer
    ( reducer
    ) where

import RequestManager.RequestManager (RequestManager)
import RequestManager.Action (Action)
import RequestManager.Payload (Payload (..))

import RequestManager.RequestManager.Internal.Reducer.Internal.InitializeRequestManager
    ( initializeRequestManager
    )

reducer :: RequestManager -> Action -> RequestManager
reducer
    requestManager
    ({ payload: (InitializeRequestManager payload) })
    = initializeRequestManager requestManager payload
