module RequestManager.RequestManager.Internal.Reducer.Internal.InitializeRequestManager
    ( initializeRequestManager
    ) where

import RequestManager.RequestManager (RequestManager)

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    , requestManager
    )

initializeRequestManager
    :: RequestManager -> InitializeRequestManager -> RequestManager
initializeRequestManager requestManager' payload =
    requestManager payload
